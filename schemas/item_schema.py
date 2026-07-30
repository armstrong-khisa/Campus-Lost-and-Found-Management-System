from extensions import ma


class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        load_instance = True
        include_relationships = True


item_schema = ItemSchema()
items_schema = ItemSchema(many=True)