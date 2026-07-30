from flask import Flask
from flask_cors import CORS

from extensions import db, ma, bcrypt, jwt, migrate

from models.user import User
from models.item import Item
from models.category import Category
from models.claim import Claim

app = Flask(__name__)
CORS(app)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///campus_lost_found.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# JWT configuration
app.config["JWT_SECRET_KEY"] = "campus-lost-found-secret-key"

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


if __name__ == "__main__":
    app.run(debug=True)