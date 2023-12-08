"""Exercises model"""

from app import db
from datetime import date
import enum
import calendar

class ExerciseType(enum.Enum):
    CARDIO = 'CARDIO'
    STRENGTH = 'STRENGTH'
    FLEXIBILITY = 'FLEXIBILITY'

"""a group of exercises belonging to a user"""
class Exercises(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    exercise_id = db.Column(db.Integer(), db.ForeignKey('exercise.id'), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    date = db.Column(db.Date, nullable=False, default=date.today())
    sets = db.Column(db.Integer(), default=1)
    reps = db.Column(db.Integer(), default=3)
    time =  db.Column(db.Integer())
    exercise = db.relationship('Exercise', backref=db.backref('exercises'))
    user = db.relationship('User', backref=db.backref('exercises_owner'))
    type = db.Column(db.Enum(ExerciseType), nullable=False)

    @classmethod
    def get_days_exercises(cls, user_id, specific_date=None):
        """Get the day's exercises grouped by meal types"""
        if specific_date is None:
            specific_date = date.today()
        exercises = cls.query.filter_by(user_id=user_id, date=specific_date).all()
        return cls.group_exercises_by_type(exercises)

    @classmethod
    def get_months_exercises(cls, user_id, specific_month=None):
        """Get the current month's menu grouped by meal types"""
        if specific_month is None:
            specific_month = date.today()
        start_date = date(specific_month.year, specific_month.month, 1)
        # print('specific => ', specific_month.year, specific_month.month, 1)
        _, last_day = calendar.monthrange(specific_month.year, specific_month.month)
        end_date = date.today() #(specific_month.year, specific_month.month, last_day)

        exercises = cls.query.filter_by(user_id=user_id).filter(
            cls.date.between(start_date, end_date)).all()
        return cls.group_monthly_exercises_by_type(exercises, start_date, end_date)

    @classmethod
    def group_exercises_by_type(cls, exercises):
        """Group meals by meal type"""
        daily_exercise_by_type = {exercise_type.value: [] for exercise_type in ExerciseType}

        for ex in exercises:
            daily_exercise_by_type[ex.type.value].append({
                'id': ex.id,
                'exercise_id': ex.exercise_id,
                'sets': ex.sets,
                'reps': ex.sets,
                'name': ex.exercise.name,  # assuming there's a 'name' attribute in the Food model
            })

        return daily_exercise_by_type

    @classmethod
    def group_monthly_exercises_by_type(cls, exercises, start_date, end_date):
        """Group meals by meal type"""
        exs = {str(day): None for day in range(1, end_date.day + 1)}
        daily_exercise_by_type = {exercise_type.value: [] for exercise_type in ExerciseType}

        for ex in exercises:
            daily_exercise_by_type[meal.type.value].append({
                'id': ex.id,
                'exercise_id': ex.exercise_id,
                'sets': ex.sets,
                'reps': ex.sets,
                'name': ex.exercise.name,  # assuming there's a 'name' attribute in the Food model
            })

            exs[ex.date.day] = daily_exercise_by_type
        return exs