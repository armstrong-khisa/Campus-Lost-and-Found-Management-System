from flask import request, jsonify
from extensions import db
from models.claim import Claim
from models.item import Item
from schemas.claim_schema import claim_schema, claims_schema
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt


# Student: submit a claim for an item
@jwt_required()
def create_claim():
    user_id = get_jwt_identity()

    data = request.get_json()

    item_id = data.get("item_id")
    message = data.get("message")

    if not item_id or not message:
        return jsonify({
            "message": "Item ID and claim message are required"
        }), 400

    item = Item.query.get(item_id)

    if not item:
        return jsonify({
            "message": "Item not found"
        }), 404

    # Prevent claiming your own reported item
    if str(item.user_id) == str(user_id):
        return jsonify({
            "message": "You cannot claim your own item"
        }), 400

    claim = Claim(
        message=message,
        user_id=user_id,
        item_id=item_id
    )

    db.session.add(claim)
    db.session.commit()

    return jsonify({
        "message": "Claim submitted successfully",
        "claim": claim_schema.dump(claim)
    }), 201


# Student: view their own claims
@jwt_required()
def get_my_claims():
    user_id = get_jwt_identity()

    claims = Claim.query.filter_by(
        user_id=user_id
    ).all()

    return jsonify(
        claims_schema.dump(claims)
    ), 200


# Admin: view all claims
@jwt_required()
def get_all_claims():
    claims = Claim.query.all()

    return jsonify(
        claims_schema.dump(claims)
    ), 200


# Admin: approve claim
@jwt_required()
def approve_claim(id):
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    claim = Claim.query.get(id)

    if not claim:
        return jsonify({
            "message": "Claim not found"
        }), 404

    claim.status = "Approved"

    # Update item status
    claim.item.status = "Claimed"

    db.session.commit()

    return jsonify({
        "message": "Claim approved",
        "claim": claim_schema.dump(claim)
    }), 200


# Admin: reject claim
@jwt_required()
def reject_claim(id):
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    claim = Claim.query.get(id)

    if not claim:
        return jsonify({
            "message": "Claim not found"
        }), 404

    claim.status = "Rejected"

    db.session.commit()

    return jsonify({
        "message": "Claim rejected",
        "claim": claim_schema.dump(claim)
    }), 200