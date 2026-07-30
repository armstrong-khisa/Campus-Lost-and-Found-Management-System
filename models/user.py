from extensions import db, bcrypt


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(50), unique=True, nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    password_hash = db.Column(db.String(255), nullable=False)

    # User role determines access level
    role = db.Column(db.String(20), default="user", nullable=False)

    # One user can report many items
    items = db.relationship(
        "Item",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    # One user can submit many claims
    claims = db.relationship(
        "Claim",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    # Hash password before saving
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    # Verify password during login
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username}>"