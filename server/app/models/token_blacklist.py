"""Class definition for BlacklistedToken."""
from datetime import timezone

from app import db
from app.util.datetime_util import utc_now, dtaware_fromtimestamp


class BlacklistedToken(db.Model):
    """BlacklistedToken Model for storing JWT tokens."""

    __tablename__ = "token_blacklist"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, default=utc_now)
    expires_at = db.Column(db.DateTime, nullable=False)

    def __init__(self, token, expires_at):
        self.token = token
        self.expires_at = dtaware_fromtimestamp(expires_at, use_tz=timezone.utc)

    def __repr__(self):
        return f"<BlacklistToken token={self.token}>"

    @classmethod
    def check_blacklist(self, token):
        exists = self.query.filter_by(token=token).first()
        return True if exists else False
