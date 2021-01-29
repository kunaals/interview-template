import graphene
from graphene import ObjectType, String, Schema, Int, Field, List, Mutation
from graphene_sqlalchemy import SQLAlchemyObjectType
from backend.db import db_session
from backend.models.user_model import UserModel
from backend.models.vendor_model import VendorModel


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel


class Vendor(SQLAlchemyObjectType):
    class Meta:
        model = VendorModel


class Query(ObjectType):
    users = List(User)
    user = Field(User, id=Int())

    vendors = List(Vendor)
    vendor = Field(Vendor, id=Int())

    def resolve_users(root, info):
        query = User.get_query(info)  # SQLAlchemy query
        return query.all()

    def resolve_user(root, info, id):
        query = User.get_query(info)
        return query.filter(UserModel.id == id).first()

    def resolve_vendors(root, info):
        query = Vendor.get_query(info)
        return query.all()

    def resolve_vendor(root, info, id):
        query = Vendor.get_query(info)
        return query.filter(VendorModel.id == id).first()


class UpdateVendorStatus(Mutation):
    class Arguments:
        id = Int()  # vendor ID
        status = Int()

    Output = Vendor

    def mutate(root, info, id, status):
        vendor = Vendor.get_query(info).filter(VendorModel.id == id).first()
        vendor.status = status
        db_session.commit()
        return vendor


class UpdateVendorCategory(Mutation):
    class Arguments:
        id = Int()  # vendor ID
        category = String()

    Output = Vendor

    def mutate(root, info, id, category):
        vendor = Vendor.get_query(info).filter(VendorModel.id == id).first()
        vendor.category = category
        db_session.commit()
        return vendor


class Mutations(ObjectType):
    update_vendor_status = UpdateVendorStatus.Field()
    update_vendor_category = UpdateVendorCategory.Field()


schema = Schema(query=Query, mutation=Mutations)

# For testing
result = schema.execute(
  """
  mutation UpdateVendorStatus($id: Int!, $status: Int!) {
    updateVendorStatus(id: $id, status: $status) {
      name
      status
    }
  }
  """,
  variables={'id': 1, 'status': 2}
)
assert result.data['updateVendorStatus']['name'] == '1Password'
assert result.data['updateVendorStatus']['status'] == 2