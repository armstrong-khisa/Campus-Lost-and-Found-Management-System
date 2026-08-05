from flask import Flask
from flask_cors import CORS

from extensions import db, ma, bcrypt, jwt, migrate

from models.user import User
from models.item import Item
from models.category import Category
from models.claim import Claim

from controllers import (
    auth_controller,
    user_controller,
    item_controller,
    claim_controller,
    category_controller
)


app = Flask(__name__)

CORS(app)


# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://campus_lost_found_zwo2_user:"
    "oO3kAICXvlj5DrEfhnP3rthLTNlrT6V1"
    "@dpg-d9nm49qjnfac73bcco80-a.oregon-postgres.render.com/"
    "campus_lost_found_zwo2"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# JWT configuration
app.config["JWT_SECRET_KEY"] = (
    "campus-lost-found-super-secret-key-2026-very-secure"
)


# Initialize extensions
db.init_app(app)
ma.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)


@app.get("/")
def home():
    return {
        "message": "Campus Lost and Found API is running."
    }


# Authentication Routes

@app.route("/auth/register", methods=["POST"])
def register():
    return auth_controller.register()


@app.route("/auth/login", methods=["POST"])
def login():
    return auth_controller.login()



# User Routes
@app.route("/users", methods=["GET"])
def get_users():
    return user_controller.get_users()


@app.route("/users/me", methods=["GET"])
def get_profile():
    return user_controller.get_profile()


@app.route("/users/me/items", methods=["GET"])
def get_my_items():
    return user_controller.get_my_items()


@app.route("/users/me/claims", methods=["GET"])
def get_my_claims():
    return user_controller.get_my_claims()



# Item Routes

@app.route("/items", methods=["GET"])
def get_items():
    return item_controller.get_items()


@app.route("/items/<int:id>", methods=["GET"])
def get_item(id):
    return item_controller.get_item(id)


@app.route("/items", methods=["POST"])
def create_item():
    return item_controller.create_item()


@app.route("/items/<int:id>", methods=["PUT"])
def update_item(id):
    return item_controller.update_item(id)


@app.route("/items/<int:id>", methods=["DELETE"])
def delete_item(id):
    return item_controller.delete_item(id)



# Claim Routes

@app.route("/claims", methods=["POST"])
def create_claim():
    return claim_controller.create_claim()


@app.route("/claims/my", methods=["GET"])
def my_claims():
    return claim_controller.get_my_claims()


@app.route("/claims", methods=["GET"])
def all_claims():
    return claim_controller.get_all_claims()


@app.route("/claims/<int:id>/approve", methods=["PUT"])
def approve_claim(id):
    return claim_controller.approve_claim(id)


@app.route("/claims/<int:id>/reject", methods=["PUT"])
def reject_claim(id):
    return claim_controller.reject_claim(id)



# Category Routes

@app.route("/categories", methods=["GET"])
def get_categories():
    return category_controller.get_categories()


@app.route("/categories/<int:id>", methods=["GET"])
def get_category(id):
    return category_controller.get_category(id)


@app.route("/categories", methods=["POST"])
def create_category():
    return category_controller.create_category()


@app.route("/categories/<int:id>", methods=["DELETE"])
def delete_category(id):
    return category_controller.delete_category(id)



print(app.url_map)


if __name__ == "__main__":
    app.run(debug=True, port=3000)