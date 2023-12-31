from faker import Faker
from app.instance import app
from app.db import db
from app.models.user import User
from app.models.user import IsVerified
import random

fake = Faker()

with app.app_context():
    print("creating new databases")
    db.create_all()
    print('Seeding some initial data')
    User.query.delete()
    new_users = []
    for _ in range(20):

        new_user = {
            'id': random.randint(1000, 10000),
            'name': fake.name(),
            'email': fake.email(),
            'profile_photo': 'https://avatars.githubusercontent.com/u/66499851',
            'email_verified': IsVerified.true,
            'age': random.randint(18, 35),
            'height': 183,
            'weight': 193,
            'target_calories': random.randint(2000, 2500),
            'password': '20031980'
        }

        new_user = User(**new_user)
        db.session.add(new_user)

    #db.session.add_all(new_users)
    db.session.commit()
    print('Seeding Successful')
