from database import db

#User DB
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    tasks = db.relationship(
        "Task",
        backref="user",
        lazy=True,
        cascade="all, delete-orphan"
    )

#Task DB
class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.Date)
    priority = db.Column(
        db.Enum("Low", "Medium", "High"),
        default="Low",
        nullable=False
    )
    
    status = db.Column(
        db.Enum("To Do", "In Progress", "Done"),
        default="To Do",
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )