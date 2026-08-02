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


    alex = User(
        username="alex",
        email="alex@gmail.com"
    )
    alex.set_password("password123")


    kevin = User(
        username="kevin",
        email="kevin@gmail.com"
    )
    kevin.set_password("password123")


    sarah = User(
        username="sarah",
        email="sarah@gmail.com"
    )
    sarah.set_password("password123")


    db.session.add_all([
        admin,
        john,
        mary,
        alex,
        kevin,
        sarah
    ])

    db.session.commit()



    print("Creating categories...")


    electronics = Category(name="Electronics")
    documents = Category(name="Documents")
    clothing = Category(name="Clothing")
    books = Category(name="Books")
    accessories = Category(name="Accessories")
    other = Category(name="Other")


    db.session.add_all([
        electronics,
        documents,
        clothing,
        books,
        accessories,
        other
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
        image_url=None,
        user_id=mary.id,
        category_id=documents.id
    )


    hoodie = Item(
        title="Grey Hoodie",
        description="Grey Nike hoodie.",
        item_type="Lost",
        location="Cafeteria",
        image_url=None,
        user_id=john.id,
        category_id=clothing.id
    )


    book = Item(
        title="Python Programming Book",
        description="Python textbook with handwritten notes.",
        item_type="Lost",
        location="Computer Lab",
        image_url=None,
        user_id=alex.id,
        category_id=books.id
    )


    headphones = Item(
        title="Wireless Headphones",
        description="Black Bluetooth headphones.",
        item_type="Found",
        location="Lecture Hall",
        image_url=None,
        user_id=kevin.id,
        category_id=electronics.id
    )


    wallet = Item(
        title="Brown Wallet",
        description="Leather wallet with student cards.",
        item_type="Found",
        location="Parking Area",
        image_url=None,
        user_id=sarah.id,
        category_id=accessories.id
    )


    db.session.add_all([
        laptop,
        id_card,
        hoodie,
        book,
        headphones,
        wallet
    ])

    db.session.commit()



    print("Creating claims...")


    claim1 = Claim(
        message="This laptop belongs to me. I can provide the serial number.",
        user_id=john.id,
        item_id=laptop.id
    )


    claim2 = Claim(
        message="This is my student ID card. It contains my registration details.",
        user_id=john.id,
        item_id=id_card.id
    )


    claim3 = Claim(
        message="The hoodie has my name written inside.",
        user_id=mary.id,
        item_id=hoodie.id
    )


    claim4 = Claim(
        message="I have notes inside this programming book.",
        user_id=alex.id,
        item_id=book.id
    )


    claim5 = Claim(
        message="These headphones match my missing pair.",
        user_id=kevin.id,
        item_id=headphones.id
    )


    claim6 = Claim(
        message="The wallet contains my student card.",
        user_id=sarah.id,
        item_id=wallet.id
    )


    db.session.add_all([
        claim1,
        claim2,
        claim3,
        claim4,
        claim5,
        claim6
    ])

    db.session.commit()


    print("Database seeded successfully.")