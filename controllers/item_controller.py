from flask import request, jsonify
from extensions import db
from models.item import Item
from schemas.item_schema import item_schema, items_schema
from flask_jwt_extended import jwt_required, get_jwt_identity


# Public: browse all items
def get_items():
    items = Item.query.all()

    return jsonify(
        items_schema.dump(items)
    ), 200


# Public: view one item
def get_item(id):
    item = Item.query.get(id)

    if not item:
        return jsonify({
            "message": "Item not found"
        }), 404

    return jsonify(
        item_schema.dump(item)
    ), 200


# Protected: report lost/found item
@jwt_required()
def create_item():
    user_id = get_jwt_identity()

    data = request.get_json()

    title = data.get("title")
    description = data.get("description")
    item_type = data.get("item_type")
    location = data.get("location")
    image_url = data.get("image_url")
    category_id = data.get("category_id")

    if not title or not description or not item_type or not location:
        return jsonify({
            "message": "Required fields are missing"
        }), 400

    item = Item(
        title=title,
        description=description,
        item_type=item_type,
        location=location,
        image_url=image_url,
        category_id=category_id,
        user_id=user_id
    )

    db.session.add(item)
    db.session.commit()

    return jsonify({
        "message": "Item reported successfully",
        "item": item_schema.dump(item)
    }), 201


# Protected: update own item
@jwt_required()
def update_item(id):
    user_id = get_jwt_identity()

    item = Item.query.get(id)

    if not item:
        return jsonify({
            "message": "Item not found"
        }), 404

    if str(item.user_id) != str(user_id):
        return jsonify({
            "message": "Unauthorized"
        }), 403

    data = request.get_json()

    item.title = data.get(
        "title",
        item.title
    )

    item.description = data.get(
        "description",
        item.description
    )

    item.location = data.get(
        "location",
        item.location
    )

    item.image_url = data.get(
        "image_url",
        item.image_url
    )

    db.session.commit()

    return jsonify({
        "message": "Item updated",
        "item": item_schema.dump(item)
    }), 200


# Protected: delete own item
@jwt_required()
def delete_item(id):
    user_id = get_jwt_identity()

    item = Item.query.get(id)

    if not item:
        return jsonify({
            "message": "Item not found"
        }), 404

    if str(item.user_id) != str(user_id):
        return jsonify({
            "message": "Unauthorized"
        }), 403

    db.session.delete(item)
    db.session.commit()

    return jsonify({
        "message": "Item deleted successfully"
    }), 200