"""Exercise model"""

from app import db
import enum

class ExerciseType(enum.Enum):
    """is a user verified?"""
    PUBLIC = 'PUBLIC'
    CUSTOM = 'CUSTOM'

class Exercise(db.Model):
    """exercises model"""
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.Text(), nullable=False)
    type = db.Column(db.Enum(ExerciseType), default=ExerciseType.PUBLIC.value)
    sets = db.Column(db.Integer(), default=1)
    reps = db.Column(db.Integer(), default=3)
    calories = db.Column(db.Integer(), nullable=False)
    time =  db.Column(db.Integer())
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)

    exercises = db.relationship('Exercises', backref='exercise', lazy=True, cascade='all')



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type.value,
            'sets': self.sets,
            'reps': self.reps,
            'calories': self.calories,
            'time': self.time
        }