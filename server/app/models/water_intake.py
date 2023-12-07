"""water goal model"""

from collections import defaultdict
from app import db
from .user import User
from datetime import datetime, timedelta, date


class WaterIntakes(db.Model):
    """Water goal model"""
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    amount = db.Column(db.Integer())
    user = db.relationship(
        'User', backref=db.backref('water_goals', lazy=True))

    @classmethod
    def get_daily_intake(self, user_id, date=None):
        """Get water intake for a specific day"""
        try:
            query_date = date or datetime.utcnow().date()
            start_time = datetime.combine(query_date, datetime.min.time())
            end_time = datetime.combine(
                query_date + timedelta(days=1), datetime.min.time())
            intakes = self.query.filter_by(user_id=user_id).filter(
                self.timestamp.between(start_time, end_time)).all()
            intakes_dict = {'data': []}
            total_water = 0
            for intake in intakes:

                total_water += intake.amount
                intakes_dict['data'].append(
                    dict(amount=intake.amount, timestamp=intake.timestamp.isoformat()))
            intakes_dict['total_intake'] = total_water
            return intakes_dict
        except Exception as e:
            import traceback
            traceback.print_exc()

    @classmethod
    def get_weekly_intake(cls, user_id):
        """Get total water intake for each day of the current week"""
        today = datetime.utcnow()
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=7)

        goals = cls.query.filter_by(user_id=user_id).filter(
            cls.timestamp.between(start_of_week, end_of_week)).all()

        # Initialize a dictionary to store the total intake for each day
        daily_intake_distribution = defaultdict(int)

        # Calculate the total intake for each day
        for goal in goals:
            # Assuming goal.timestamp is a datetime object
            day = goal.timestamp.strftime('%Y-%m-%d')
            daily_intake_distribution[day] += goal.amount

        # Convert the dictionary to a list of dictionaries for easier consumption in JavaScript
        total_intake = sum([total_intake for _, total_intake in daily_intake_distribution.items()])
        result_list = [{'day': day, 'total_intake': total_intake} for day, total_intake in daily_intake_distribution.items()]

        return total_intake, result_list

    @classmethod
    def get_monthly_intake(cls, user_id):
        """Get total water intake for each day of the current month"""
        today = datetime.utcnow()
        start_of_month = datetime(today.year, today.month, 1)
        end_of_month = start_of_month + timedelta(days=32)  # Assuming no months have more than 31 days

        goals = cls.query.filter_by(user_id=user_id).filter(
            cls.timestamp.between(start_of_month, end_of_month)).all()

        # Initialize a dictionary to store the total intake for each day
        daily_intake_distribution = defaultdict(int)

        # Calculate the total intake for each day
        for goal in goals:
            # Assuming goal.timestamp is a datetime object
            day = goal.timestamp.strftime('%Y-%m-%d')
            daily_intake_distribution[day] += goal.amount

        # Convert the dictionary to a list of dictionaries for easier consumption in JavaScript
        total_intake = sum([total_intake for _, total_intake in daily_intake_distribution.items()])
        result_list = [{'day': day, 'total_intake': total_intake} for day, total_intake in daily_intake_distribution.items()]

        return total_intake, result_list
