"""water goal model"""

from collections import defaultdict
from app import db
from .user import User
from datetime import datetime, timedelta, date, timezone

def get_start_of_week():
    today = datetime.now()
    start_of_week = today - timedelta(days=today.weekday())
    start_of_week = start_of_week.replace(hour=0, minute=0, second=0, microsecond=0)
    return start_of_week

def get_end_of_week():
    today = datetime.now()
    days_until_end_of_week = 6 - today.weekday()  # 6 represents Saturday
    end_of_week = today + timedelta(days=days_until_end_of_week)
    end_of_week = end_of_week.replace(hour=23, minute=59, second=59, microsecond=999999)
    return end_of_week

class WaterIntakes(db.Model):
    """Water goal model"""
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    amount = db.Column(db.Integer())

    @classmethod
    def get_daily_intake1(self, user_id, date=None):
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
    def get_daily_intake(cls, user_id, date=None):
        """Get water intake for the current and previous day"""
        try:
            # Calculate the current and previous day dates
            current_date = date or datetime.utcnow().date()
            previous_date = current_date - timedelta(days=1)

            # Query for the current day's intake
            current_day_start_time = datetime.combine(current_date, datetime.min.time())
            current_day_end_time = current_day_start_time + timedelta(days=1)
            current_intakes = cls.query.filter_by(user_id=user_id).filter(
                cls.timestamp.between(current_day_start_time, current_day_end_time)).all()

            # Query for the previous day's intake
            previous_day_start_time = datetime.combine(previous_date, datetime.min.time())
            previous_day_end_time = previous_day_start_time + timedelta(days=1)
            previous_intakes = cls.query.filter_by(user_id=user_id).filter(
                cls.timestamp.between(previous_day_start_time, previous_day_end_time)).all()

            # Process and format the data for the current day
            current_intakes_dict = {'data': []}
            current_total_water = 0
            for intake in current_intakes:
                current_total_water += intake.amount
                current_intakes_dict['data'].append(
                    dict(amount=intake.amount, timestamp=intake.timestamp.isoformat()))
            current_intakes_dict['total_intake'] = current_total_water
            current_intakes_dict['data'].reverse()

            # Process and format the data for the previous day
            previous_intakes_dict = {'data': []}
            previous_total_water = 0
            for intake in previous_intakes:
                previous_total_water += intake.amount
                previous_intakes_dict['data'].append(
                    dict(amount=intake.amount, timestamp=intake.timestamp.isoformat()))
            previous_intakes_dict['total_intake'] = previous_total_water

            return {'current_day': current_intakes_dict, 'previous_day': previous_intakes_dict}

        except Exception as e:
            import traceback
            traceback.print_exc()


    @classmethod
    def get_weekly_intake1(cls, user_id):
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
    from collections import defaultdict

    @classmethod
    def get_weekly_intake(cls, user_id):
        """Get total water intake for each day of the current week"""
        today = datetime.utcnow()
        start_of_week = get_start_of_week()
        end_of_week = get_end_of_week()


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
        result_list = []
        for day in (start_of_week + timedelta(n) for n in range(7)):
            day_str = day.strftime('%Y-%m-%d')
            total_intake = daily_intake_distribution.get(day_str, 0)
            result_list.append({'day': day_str, 'total_intake': total_intake})

        return sum(total_intake for total_intake in daily_intake_distribution.values()), result_list


    @classmethod
    def get_last_weeks(cls, user_id):
        today = datetime.utcnow()
        two_weeks_ago = datetime.utcnow() - timedelta(weeks=2)
        one_weeks_ago = datetime.utcnow() - timedelta(weeks=1)

        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=7)

        prev_week = cls.query.filter_by(user_id=user_id).filter(
            cls.timestamp.between(two_weeks_ago, one_weeks_ago)).with_entities(db.func.sum(cls.amount)).scalar() or 0

        immediate_week = cls.query.filter_by(user_id=user_id).filter(
            cls.timestamp.between(one_weeks_ago, today)).with_entities(db.func.sum(cls.amount)).scalar() or 0
        return immediate_week, prev_week


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

    @classmethod
    def get_last_months(cls, user_id):
        today = datetime.utcnow()
        two_months_ago = datetime.utcnow() - timedelta(weeks=8)
        one_month_ago = datetime.utcnow() - timedelta(weeks=4)


        prev_month = cls.query.filter_by(user_id=user_id).filter(
            cls.timestamp.between(two_months_ago, one_month_ago)).with_entities(db.func.sum(cls.amount)).scalar() or 0

        immediate_month = cls.query.filter_by(user_id=user_id).filter(
            cls.timestamp.between(one_month_ago, today)).with_entities(db.func.sum(cls.amount)).scalar() or 0
        return immediate_month, prev_month
