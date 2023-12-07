"""Exercise model"""

from app import db

class Exercise(db.Model):
    """exercises model"""
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True, nullable=False)
    name = db.Column(db.Text(), nullable=False)
    sets = db.Column(db.Integer(), default=1)
    reps = db.Column(db.Integer(), default=3)
    calories = db.Column(db.Integer(), nullable=False)
    time =  db.Column(db.Integer())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'sets': self.sets,
            'reps': self.reps,
            'calories': self.calories,
            'time': self.time
        }