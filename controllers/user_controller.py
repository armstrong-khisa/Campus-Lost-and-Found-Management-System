from flask import jsonify
from models.user import User
from models.item import Item
from models.claim import Claim
from schemas.user_schema import user_schema, users_schema
from schemas.item_schema import items_schema
from schemas.claim_schema import claims_schema
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    get_jwt
)


# Get current logged-in user profile
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify(
        user_schema.dump(user)
    ), 200


# Admin: Get all users
@jwt_required()
def get_users():
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    users = User.query.all()

    return jsonify(
        users_schema.dump(users)
    ), 200


# Get items reported by current user
@jwt_required()
def get_my_items():
    user_id = get_jwt_identity()

    items = Item.query.filter_by(
        user_id=user_id
    ).all()

    return jsonify(
        items_schema.dump(items)
    ), 200


# Get claims submitted by current user
@jwt_required()
def get_my_claims():
    user_id = get_jwt_identity()

    claims = Claim.query.filter_by(
        user_id=user_id
    ).all()

    return jsonify(
        claims_schema.dump(claims)
    ), 200