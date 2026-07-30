from extensions import ma


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        load_instance = True
        include_relationships = True
        exclude = ("password_hash",)


user_schema = UserSchema()
users_schema = UserSchema(many=True)