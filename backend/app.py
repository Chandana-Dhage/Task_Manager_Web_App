from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
load_dotenv()
from config import Config
from database import db


app = Flask(__name__)

app.config.from_object(Config)

CORS(
    app,
    resources={r"/api/*": {
        "origins": [
            "http://localhost:5173",
            "https://task-manager-web-app-pink.vercel.app"
        ]
    }},
    supports_credentials=True
)

db.init_app(app)
bcrypt = Bcrypt(app)

jwt = JWTManager(app)

from routes.auth import auth_bp
from routes.tasks import task_bp
from routes.ai_routes import ai_bp

app.register_blueprint(ai_bp, url_prefix="/api/ai")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(task_bp, url_prefix="/api/tasks")

@app.route("/")
def home():
    return {"message": "Task Manager API is running!"}


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)



