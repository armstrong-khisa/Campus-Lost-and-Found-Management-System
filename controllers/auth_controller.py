from flask import request, jsonify
from extensions import db
from models.user import User
from schemas.user_schema import user_schema
from flask_jwt_extended import create_access_token


def register():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({
            "message": "Username, email and password are required"
        }), 400

    # Check if user already exists
    existing_user = User.query.filter(
        (User.username == username) |
        (User.email == email)
    ).first()

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 409

    user = User(
        username=username,
        email=email,
        role="user"
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": user_schema.dump(user)
    }), 201


def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    if not user or not user.check_password(password):
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    # JWT stores the user's id
    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role
        }
    )

    return jsonify({
        "message": "Login successful",
        "access_token": token,
        "user": user_schema.dump(user)
    }), 200