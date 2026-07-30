from extensions import ma


class ClaimSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        load_instance = True
        include_relationships = True


claim_schema = ClaimSchema()
claims_schema = ClaimSchema(many=True)