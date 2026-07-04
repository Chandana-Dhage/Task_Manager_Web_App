import os
import json
import requests

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"


def generate_task(title):

    prompt = f"""
You are an assistant for a Task Manager application.

The user entered this task title:

"{title}"

Generate:

1. A professional task description.
2. A suggested priority (Low, Medium, or High).

Return ONLY valid JSON.

Example:

{{
    "description": "Investigate and fix the login issue preventing users from accessing the application. Test the authentication flow after implementing the fix.",
    "priority": "High"
}}

Do not return markdown.
Do not return explanations.
Return JSON only.
"""

    body = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    response = requests.post(URL, json=body)

    response.raise_for_status()

    result = response.json()
    text = result["candidates"][0]["content"]["parts"][0]["text"]
    text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)