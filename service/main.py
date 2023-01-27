from fastapi import FastAPI
from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List
import motor.motor_asyncio

app = FastAPI()
db_client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
d3 = db_client.d3


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# class DishesModel(BaseModel):
#     id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
#     name: str = Field(...)
#     orders: int = Field(...)
#
#     class Config:
#         allow_population_by_field_name = True
#         arbitrary_types_allowed = True
#         json_encoders = {ObjectId: str}
#         schema_extra = {
#             "example": {
#                 "name": "veg soup",
#                 "orders": 200
#             }
#         }

class ResponseDishModel(BaseModel):
    name: str = Field(...)
    orders: int = Field(...)

class ResponseBudgetModel(BaseModel):
    name: str = Field(...)
    amount: int = Field(...)

@app.get('/dishes', response_model=List[ResponseDishModel])
async def get_all_dishes():
    dish_list = []
    cursor = d3.dishes.find()
    async for dish in cursor:
        menu_item = { 'name': dish['name'], 'orders': dish['orders']}
        dish_list.append(menu_item)
    return dish_list

@app.get('/budgets', response_model=List[ResponseBudgetModel])
async def get_budgets():
    budget_list = []
    cursor = d3.budgets.find()
    async for budget in cursor:
        budget_item = { 'name': budget['name'], 'amount': budget['amount']}
        budget_list.append(budget_item)
        return budget_list
