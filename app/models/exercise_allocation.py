"""Exercise allocation"""

from app import db

class ExerciseAllocation(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    exercises_id = db.Column(db.Integer(), db.ForeignKey('exercises.id'))
    reps = db.Column(db.Integer())
    sets = db.Column(db.Integer())
    exercise_id =db.Column(db.Integer(), db.ForeignKey('exercise.id'))
