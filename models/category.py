from extensions import db


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), unique=True, nullable=False)

    # One category can contain many items
    items = db.relationship(
        "Item",
        back_populates="category"
    )

    def __repr__(self):
        return f"<Category {self.name}>"