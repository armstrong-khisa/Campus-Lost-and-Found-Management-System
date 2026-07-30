from app import app
from extensions import db

from models.user import User
from models.category import Category
from models.item import Item
from models.claim import Claim


with app.app_context():

    print("Clearing database...")

    Claim.query.delete()
    Item.query.delete()
    Category.query.delete()
    User.query.delete()

    db.session.commit()

    print("Creating users...")

    admin = User(
        username="admin",
        email="admin@campus.com",
        role="admin"
    )
    admin.set_password("admin123")

    john = User(
        username="john",
        email="john@gmail.com"
    )
    john.set_password("password123")

    mary = User(
        username="mary",
        email="mary@gmail.com"
    )
    mary.set_password("password123")

    db.session.add_all([admin, john, mary])
    db.session.commit()

    print("Creating categories...")

    electronics = Category(name="Electronics")
    documents = Category(name="Documents")
    clothing = Category(name="Clothing")

    db.session.add_all([
        electronics,
        documents,
        clothing
    ])
    db.session.commit()

    print("Creating items...")

    laptop = Item(
        title="HP EliteBook",
        description="Black HP laptop with charger.",
        item_type="Lost",
        location="Library",
        image_url="https://example.com/laptop.jpg",
        user_id=john.id,
        category_id=electronics.id
    )

    id_card = Item(
        title="Student ID",
        description="Blue student ID card.",
        item_type="Found",
        location="Main Gate",
        user_id=mary.id,
        category_id=documents.id
    )

    hoodie = Item(
        title="Grey Hoodie",
        description="Grey Nike hoodie.",
        item_type="Lost",
        location="Cafeteria",
        user_id=john.id,
        category_id=clothing.id
    )

    db.session.add_all([
        laptop,
        id_card,
        hoodie
    ])
    db.session.commit()

    print("Creating claims...")

    claim = Claim(
        message="I think this ID belongs to me because it has my registration number.",
        user_id=john.id,
        item_id=id_card.id
    )

    db.session.add(claim)
    db.session.commit()

    print("Database seeded successfully.")