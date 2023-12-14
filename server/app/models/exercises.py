"""Exercises model"""

from app import db
from datetime import date, timedelta
import enum
import calendar
from sqlalchemy import ForeignKey


class ExerciseType(enum.Enum):
    CARDIO = 'CARDIO'
    STRENGTH = 'STRENGTH'
    FLEXIBILITY = 'FLEXIBILITY'


"""a group of exercises belonging to a user"""


class Exercises(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    exercise_id = db.Column(db.Integer(), db.ForeignKey(
        'exercise.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                        nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    sets = db.Column(db.Integer(), default=1)
    reps = db.Column(db.Integer(), default=3)
    time = db.Column(db.Integer())
    type = db.Column(db.Enum(ExerciseType), nullable=False)
    # exercise = db.relationship('Exercise', backref=db.backref('exercises', passive_deletes=True))

    def to_dict(self):
        return {
            'id': self.id,
            'exercise_id': self.exercise_id,
            'user_id': self.user_id,
            'date': self.date.isoformat(),
            'sets': self.sets,
            'reps': self.reps,
            'time': self.time,
            'type': self.type.value
        }

    @classmethod
    def get_days_exercises(cls, user_id, specific_date=None):
        """Get the day's exercises grouped by meal types"""
        if specific_date is None:
            specific_date = date.today()
        exercises = cls.query.filter_by(
            user_id=user_id, date=specific_date).all()
        return cls.group_exercises_by_type(exercises)

    @classmethod
    def get_months_exercises(cls, user_id, specific_month=None):
        """Get the current month's menu grouped by meal types"""
        if specific_month is None:
            specific_month = date.today()
        start_date = date(specific_month.year, specific_month.month, 1)
        # print('specific => ', specific_month.year, specific_month.month, 1)
        _, last_day = calendar.monthrange(
            specific_month.year, specific_month.month)
        end_date = date.today()  # (specific_month.year, specific_month.month, last_day)

        exercises = cls.query.filter_by(user_id=user_id).filter(
            cls.date.between(start_date, end_date)).all()
        print('exer', exercises)
        return cls.group_monthly_exercises_by_type(exercises, start_date, end_date)

    @classmethod
    def group_exercises_by_type(cls, exercises):
        """Group meals by meal type"""
        daily_exercise_by_type = {exercise_type.value: []
                                  for exercise_type in ExerciseType}

        for ex in exercises:
            daily_exercise_by_type[ex.type.value].append({
                'id': ex.id,
                'exercise_id': ex.exercise_id,
                'sets': ex.sets,
                'reps': ex.sets,
                'name': ex.exercise.name,  # assuming there's a 'name' attribute in the Food model
                'time': ex.sets,
                'calories': ex.exercise.calories
            })

        return daily_exercise_by_type

    @classmethod
    def group_monthly_exercises_by_type(cls, exercises, start_date, end_date):
        """Group meals by meal type"""
        exs = {(start_date + timedelta(day)).isoformat(): cls.calculate_total_day_calories_and_time({'distribution': {
            ex_type.value: {'data': []} for ex_type in ExerciseType}}) for day in range(end_date.day - 1, -1, -1)}
        daily_exercise_by_type = {'distribution': {
            ex_type.value: {'data': []} for ex_type in ExerciseType}}
        for ex in exercises:
            daily_exercise_by_type['distribution'][ex.type.value]['data'].append({
                'id': ex.id,
                'exercise_id': ex.exercise_id,
                'sets': ex.sets,
                'reps': ex.sets,
                'time': ex.sets,
                'name': ex.exercise.name,  # assuming there's a 'name' attribute in the Food model
                'calories': ex.exercise.calories
            })

            exs[ex.date.isoformat()] = cls.calculate_total_day_calories_and_time(
                daily_exercise_by_type)
        return exs

    @classmethod
    def calculate_total_day_calories_and_time(self, data):

        day_data = data['distribution']

        day_calories = 0
        day_time = 0
        for ex_type, ex_data in day_data.items():
            ex_calories = 0
            ex_time = 0

            day_ex = ex_data['data']
            for ex in day_ex:
                ex_calories += ex['calories'] * ex['reps'] * ex['sets']
                ex_time += ex['time'] * ex['reps'] * ex['sets']
            data['distribution'][ex_type]['total_calories'] = ex_calories
            data['distribution'][ex_type]['total_time'] = ex_time
            day_calories += ex_calories
            day_time += ex_time
        data['total_calories'] = day_calories
        data['total_time'] = day_time
        return data
