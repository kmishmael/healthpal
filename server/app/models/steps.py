"""Steps model implementation"""

from app import db
from datetime import date
from sqlalchemy import func
from datetime import date, timedelta


class StepData(db.Model):
    """steps model definition"""
    __tablename__ = 'step_data'

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today())
    steps = db.Column(db.Integer(), nullable=False)
    distance = db.Column(db.Integer(), nullable=True)
    duration = db.Column(db.Integer(), nullable=True)
    calories_burned = db.Column(db.Integer(), nullable=True)
    owner = db.relationship('User', backref=db.backref('steps_owner'))

    @classmethod
    def daily_steps(self, user_id, query_date=None):
        query_date = query_date or date.today()
        return self.query.with_entities(func.sum(self.steps), func.sum(self.distance), func.sum(self.duration), func.sum(self.calories_burned)).filter(self.user_id == user_id, self.date == query_date).first()

    @classmethod
    def weekly_steps(self, user_id, query_date=None):
        query_date = query_date or date.today()
        start_of_week = query_date - timedelta(days=query_date.weekday())
        return self.query.with_entities(func.sum(self.steps), func.sum(self.distance), func.sum(self.duration), func.sum(self.calories_burned)).filter(self.user_id == user_id, self.date >= start_of_week, self.date <= query_date).first()

    @classmethod
    def monthly_steps(self, user_id, query_date=None):
        query_date = query_date or date.today()
        start_of_month = date(query_date.year, query_date.month, 1)
        return self.query.with_entities(func.sum(self.steps), func.sum(self.distance), func.sum(self.duration), func.sum(self.calories_burned)).filter(self.user_id == user_id, self.date >= start_of_month, self.date <= query_date).first()

    @classmethod
    def weekly_distribution(cls, user_id):
        try:
            end_date = date.today()
            # 4 weeks * 7 days - 1 (for the current day)
            start_date = end_date - timedelta(days=27)

            result = cls.query.with_entities(func.strftime('%Y-%m-%d', cls.date), func.sum(cls.steps), func.sum(cls.distance), func.sum(cls.duration), func.sum(cls.calories_burned)).\
                filter(cls.user_id == user_id, cls.date >= start_date, cls.date <= end_date).\
                group_by(func.strftime('%Y-%m-%d', cls.date)).all()

            # Transform the result into a dictionary for easy access
            new_distribution = {}
            distribution = {date_key: dict(steps=steps, distance=distance, duration=duration, calories_burned=calories_burned)
                            for date_key, steps, distance, duration, calories_burned in result}

            print(distribution)
            # Ensure 4 weeks are represented, including the current week potentially being incomplete
            current_week_start = end_date - timedelta(days=end_date.weekday())
            for i in range(3, -1, -1):
                week_start = current_week_start - timedelta(weeks=i)
                week_end = week_start + timedelta(days=6)
                week_key = f"{week_start.strftime('%Y-%m-%d')} to {week_end.strftime('%Y-%m-%d')}"

                # Calculate the total steps for the week, considering the current week potentially being incomplete
                data = list(filter(lambda x: x != 0, [distribution.get(
                    date_key, 0) for date_key in cls.daterange(week_start, week_end)]))
                for d in data:
                    print('d =>', d['steps'])
                total_steps = sum([d['steps'] for d in data])
                total_distance = sum([d['distance'] for d in data])
                total_duration = sum([d['duration'] for d in data])
                total_calories_burned = sum([d['calories_burned'] for d in data])

                if len(data) == 0:
                    new_distribution[i] = dict(steps=0, distance=0,
                                               duration=0, calories_burned=0)

                else:
                    new_distribution[i] = dict(steps=total_steps, distance=total_distance,
                                               duration=total_duration, calories_burned=total_calories_burned)

            return new_distribution
        except Exception as e:
            print(f"An exception occurred: {e}")
            import traceback
            traceback.print_exc()
            return None

    @staticmethod
    def daterange(start_date, end_date):
        for n in range(int((end_date - start_date).days) + 1):
            yield (start_date + timedelta(n)).strftime('%Y-%m-%d')
