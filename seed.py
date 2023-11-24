from faker import Faker
from app.instance import app
from app.db import db
from app.models.user import User
import random

fake = Faker()

with app.app_context():
    print("creating new databases")
    db.create_all()
    print('Seeding some initial data')
    User.query.delete()
    new_users = []
    for _ in range(20):
        id = random.randint(1000, 10000)
        name = fake.name()
        email = fake.email()
        profile_photo = 'https://avatars.githubusercontent.com/u/66499851'
        email_verified = True
        age = random.randint(18, 35)
        height = 183
        weight = 193
        gender = 'MALE'
        target_calories = random.randint(2000, 2500)

    db.session.add_all(new_users)
    db.session.commit()
    print('Seeding Successful')
