"""Steps model implementation"""

from app import db
from datetime import date
from sqlalchemy import func
from datetime import date, timedelta


class StepData(db.Model):
    """steps model definition"""
    __tablename__ = 'step_data'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today())
    steps = db.Column(db.Integer(), nullable=False)
    distance = db.Column(db.Integer(), nullable=True)
    move_duration = db.Column(db.Integer(), nullable=True)
    calories_burned = db.Column(db.Integer(), nullable=True)
    owner = db.relationship('User', backref=db.backref('steps_owner'))

    @classmethod
    def daily_steps(self, user_id, query_date=None):
        query_date = query_date or date.today()
        return self.query.with_entities(func.sum(self.steps)).filter(self.user_id == user_id, self.date == query_date).scalar()

    @classmethod
    def weekly_steps(self, user_id, query_date=None):
        query_date = query_date or date.today()
        start_of_week = query_date - timedelta(days=query_date.weekday())
        return self.query.with_entities(func.sum(self.steps)).filter(self.user_id == user_id, self.date >= start_of_week, self.date <= query_date).scalar()

    @classmethod
    def monthly_steps(self, user_id, query_date=None):
        query_date = query_date or date.today()
        start_of_month = date(query_date.year, query_date.month, 1)
        return self.query.with_entities(func.sum(self.steps)).filter(self.user_id == user_id, self.date >= start_of_month, self.date <= query_date).scalar()

    @classmethod
    def weekly_distribution(cls, user_id):
        end_date = date.today()
        start_date = end_date - timedelta(days=27)  # 4 weeks * 7 days - 1 (for the current day)

        result = cls.query.with_entities(func.strftime('%Y-%m-%d', cls.date), func.sum(cls.steps)).\
            filter(cls.user_id == user_id, cls.date >= start_date, cls.date <= end_date).\
            group_by(func.strftime('%Y-%m-%d', cls.date)).all()

        # Transform the result into a dictionary for easy access
        distribution = {row[0]: row[1] for row in result}

        # Ensure 4 weeks are represented, including the current week potentially being incomplete
        current_week_start = end_date - timedelta(days=end_date.weekday())
        for i in range(3, -1, -1):
            week_start = current_week_start - timedelta(weeks=i)
            week_end = week_start + timedelta(days=6)
            week_key = week_start.strftime('%Y-%m-%d') + " to " + week_end.strftime('%Y-%m-%d')

            # Calculate the total steps for the week, considering the current week potentially being incomplete
            total_steps = sum(distribution[date_key] for date_key in distribution if week_start <= date.fromisoformat(date_key) <= week_end)

            distribution[week_key] = total_steps

        return distribution
