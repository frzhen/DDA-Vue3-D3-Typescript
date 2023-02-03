from fastapi import FastAPI, Body
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field
from typing import List
import motor.motor_asyncio

app = FastAPI()
db_client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
d3 = db_client.d3


class ResponseDishModel(BaseModel):
    name: str = Field(...)
    orders: int = Field(...)

class ResponseBudgetModel(BaseModel):
    id: str = Field(...)
    name: str = Field(...)
    amount: int = Field(...)


class CreateBudgetSchema(BaseModel):
    name: str = Field(...)
    amount: int = Field(..., gt=0)
    class Config:
        schema_extra = {
            "example": {
                "name": "snacks",
                "amount": 155
            }
        }

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
        budget_item = {
            'id': str(budget['_id']),
            'name': budget['name'],
            'amount': budget['amount']
        }
        budget_list.append(budget_item)
    return budget_list

@app.post("/budget")
async def create_a_budget(budget: CreateBudgetSchema = Body(...)):
    data = jsonable_encoder(budget)
    print(data)
    print(type(data))
    result = await d3.budgets.insert_one(data)
    print(f' result: {result.inserted_id}')
    new_budget = await d3.budgets.find_one({"_id": result.inserted_id})
    return {"status_code": 200, "name": new_budget["name"], "message": "budget added"}


@app.get('/fitness')
async def get_fitness_data():
    fitness_data = []
    cursor = d3.fitness.find()
    async for activity in cursor:
        activity_item = {
            'id': str(activity['_id']),
            'activity': activity['activity'],
            'date': activity['date'],
            'distance': activity['distance'],
            'unit': activity['unit']
        }
        fitness_data.append(activity_item)
    return fitness_data
