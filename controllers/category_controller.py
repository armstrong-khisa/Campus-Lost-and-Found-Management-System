from flask import request, jsonify
from extensions import db
from models.category import Category
from schemas.category_schema import category_schema, categories_schema
from flask_jwt_extended import jwt_required, get_jwt


# Public: get all categories
def get_categories():
    categories = Category.query.all()

    return jsonify(
        categories_schema.dump(categories)
    ), 200


# Public: get single category
def get_category(id):
    category = Category.query.get(id)

    if not category:
        return jsonify({
            "message": "Category not found"
        }), 404

    return jsonify(
        category_schema.dump(category)
    ), 200


# Admin: create category
@jwt_required()
def create_category():
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    data = request.get_json()

    name = data.get("name")

    if not name:
        return jsonify({
            "message": "Category name is required"
        }), 400

    existing_category = Category.query.filter_by(
        name=name
    ).first()

    if existing_category:
        return jsonify({
            "message": "Category already exists"
        }), 409

    category = Category(
        name=name
    )

    db.session.add(category)
    db.session.commit()

    return jsonify({
        "message": "Category created successfully",
        "category": category_schema.dump(category)
    }), 201


# Admin: delete category
@jwt_required()
def delete_category(id):
    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({
            "message": "Admin access required"
        }), 403

    category = Category.query.get(id)

    if not category:
        return jsonify({
            "message": "Category not found"
        }), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({
        "message": "Category deleted successfully"
    }), 200