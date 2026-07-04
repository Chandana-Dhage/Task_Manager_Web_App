from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from database import db
from models import Task
from datetime import datetime
task_bp = Blueprint("tasks", __name__)

#Creating task api
@task_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():

    current_user = int(get_jwt_identity())
    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    due_date = data.get("due_date")
    priority = data.get("priority")
    status = data.get("status")

    if not title:
        return jsonify({"message": "Title is required"}), 400

    task = Task(
        title=title,
        description=description,
        due_date=datetime.strptime(due_date, "%Y-%m-%d").date(),
        priority=priority,
        status=status,
        user_id=current_user
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({"message": "Task created successfully"}), 201

#Accessing all tasks
@task_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():

    current_user = int(get_jwt_identity())

    status = request.args.get("status")
    priority = request.args.get("priority")

    query = Task.query.filter_by(user_id=current_user)

    if status:
        query = query.filter_by(status=status)

    if priority:
        query = query.filter_by(priority=priority)

    tasks = query.all()

    task_list = []

    for task in tasks:
        task_list.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "due_date": str(task.due_date),
            "priority": task.priority,
            "status": task.status
        })

    return jsonify(task_list), 200

#Access particular task 
@task_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_task(id):

    current_user = int(get_jwt_identity())

    task = Task.query.filter_by(
        id=id,
        user_id=current_user
    ).first()

    if not task:
        return jsonify({"message": "Task not found"}), 404

    return jsonify({
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "due_date": str(task.due_date),
        "priority": task.priority,
        "status": task.status
    })

#Update particular task
@task_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_task(id):

    current_user = int(get_jwt_identity())

    task = Task.query.filter_by(
        id=id,
        user_id=current_user
    ).first()

    if not task:
        return jsonify({"message": "Task not found"}), 404

    data = request.get_json()

    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)

    if data.get("due_date"):
        task.due_date = datetime.strptime(
            data["due_date"],
            "%Y-%m-%d"
        ).date()

    task.priority = data.get("priority", task.priority)
    task.status = data.get("status", task.status)

    db.session.commit()

    return jsonify({"message": "Task updated successfully"})

#Delete particular task
@task_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):

    current_user = int(get_jwt_identity())

    task = Task.query.filter_by(
        id=id,
        user_id=current_user
    ).first()

    if not task:
        return jsonify({"message": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"})