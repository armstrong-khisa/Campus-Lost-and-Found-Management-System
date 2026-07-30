from extensions import ma
from models.item import Item


class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Item
        load_instance = True
        include_relationships = True


item_schema = ItemSchema()
items_schema = ItemSchema(many=True)