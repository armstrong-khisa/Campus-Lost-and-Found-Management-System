from extensions import ma
from models.claim import Claim


class ClaimSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Claim
        load_instance = True
        include_relationships = True


claim_schema = ClaimSchema()
claims_schema = ClaimSchema(many=True)