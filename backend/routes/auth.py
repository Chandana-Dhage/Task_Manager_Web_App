from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
import re
from database import db
from models import User
from utils import hash_password, verify_password

auth_bp = Blueprint("auth", __name__)

#User register api route
@auth_bp.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if len(password) < 6:
        return jsonify({"message": "Password must be at least 6 characters"}), 400

    email_pattern = r"^[^@]+@[^@]+\.[^@]+$"

    if not re.match(email_pattern, email):
        return jsonify({"message": "Invalid email format"}), 400    

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"message": "Email already exists"}), 409

    hashed_password = hash_password(password)

    user = User(
        username=username,
        email=email,
        password=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

#User login api route
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    if not verify_password(password, user.password):
        return jsonify({"message": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": token,
        "username": user.username
    }), 200