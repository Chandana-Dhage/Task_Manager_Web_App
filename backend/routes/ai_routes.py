from flask import Blueprint, request, jsonify
from ai import generate_task

ai_bp = Blueprint("ai", __name__)

#AI suggest api route

@ai_bp.route("/suggest", methods=["POST"])
def suggest():
    data = request.get_json()
    title = data.get("title", "").strip()

    if not title:
        return jsonify({

            "message": "Title is required"

        }), 400

    try:
        result = generate_task(title)
        return jsonify(result)

    except Exception as e:
        return jsonify({

            "message": str(e)

        }), 500