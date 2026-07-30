from extensions import db


class Claim(db.Model):
    __tablename__ = "claims"

    id = db.Column(db.Integer, primary_key=True)

    # Reason why the user believes the item is theirs
    message = db.Column(db.Text, nullable=False)

    # Pending, Approved or Rejected
    status = db.Column(
        db.String(20),
        default="Pending",
        nullable=False
    )

    claimed_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    # User making the claim
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    # Item being claimed
    item_id = db.Column(
        db.Integer,
        db.ForeignKey("items.id"),
        nullable=False
    )

    # Relationships
    user = db.relationship(
        "User",
        back_populates="claims"
    )

    item = db.relationship(
        "Item",
        back_populates="claims"
    )

    def __repr__(self):
        return f"<Claim {self.id}>"