import graphene
from graphene import ObjectType, String, Schema
from graphene_sqlalchemy import SQLAlchemyObjectType
from backend.models.user_model import UserModel
from backend.models.vendor_model import VendorModel

class TestMutation(graphene.Mutation):
  class Arguments:
    test_arg = String()

  result = String()

  def mutate(root, info, **kwargs):
    # Do some mutation
    return TestMutation(
      result="Test response"
    )

class Mutations(graphene.ObjectType):
  test_mutation = TestMutation.Field()

class User(SQLAlchemyObjectType):
  class Meta:
    model = UserModel

class Vendor(SQLAlchemyObjectType):
  class Meta:
    model = VendorModel

class Query(ObjectType):
  users = graphene.List(User)
  user = graphene.Field(User, id=graphene.Int())

  vendors = graphene.List(Vendor)
  vendor = graphene.Field(Vendor, id=graphene.Int())


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

schema = Schema(query=Query, mutation=Mutations)
