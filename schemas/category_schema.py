from extensions import ma


class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        load_instance = True
        include_relationships = True


category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)