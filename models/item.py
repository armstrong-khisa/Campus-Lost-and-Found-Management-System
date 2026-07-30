from extensions import db


class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(150), nullable=False)

    description = db.Column(db.Text, nullable=False)

    # Lost or Found
    item_type = db.Column(db.String(20), nullable=False)

    # Pending, Claimed or Returned
    status = db.Column(
        db.String(20),
        default="Pending",
        nullable=False
    )

    location = db.Column(db.String(150), nullable=False)

    # Optional image URL
    image_url = db.Column(db.String(255))

    date_reported = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    # Item owner
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    # Category is optional
    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id"),
        nullable=True
    )

    # Relationships
    user = db.relationship(
        "User",
        back_populates="items"
    )

    category = db.relationship(
        "Category",
        back_populates="items"
    )

    claims = db.relationship(
        "Claim",
        back_populates="item",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Item {self.title}>"