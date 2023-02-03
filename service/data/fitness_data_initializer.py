import datetime
import json
import random

data = []
item_number = 5
unit = 'meter'


def generate_activity(activity: str):
    year = 2023
    month = random.randint(3, 6)
    date = random.randint(1, 30)
    date_string = str(datetime.datetime(year, month, date))
    return {
        "activity": activity,
        "date": date_string,
        "distance": random.randint(10, 20) * 100,
        "unit": unit
    }


for i in range(0, item_number):
    data.append(generate_activity('Cycling'))
    data.append(generate_activity('Running'))
    data.append(generate_activity('Swimming'))
    data.append(generate_activity('Walking'))

json_data = json.dumps(data, indent=4)

with open("fitness_data.json", mode='w') as file:
        file.write(json_data)

