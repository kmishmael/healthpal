from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os
from flask_restful import Api
from .instance import app
from flask_login import LoginManager
from flask_bcrypt import Bcrypt


basedir = os.path.abspath(os.path.dirname(__file__))


bcrypt = Bcrypt()
login = LoginManager()
login.login_view = 'signin'
login.session_protection = "strong"
login.login_message_category = "info"

# Flask SQLAlchemy
db = SQLAlchemy()

# Flask Migrate
migrate = Migrate()

def create_app():
    print('I am here')
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('MYSQL_URL') or  'sqlite:///' + os.path.join(basedir, 'app.db')
    app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', '.webp', '.jpeg']
    app.config['UPLOAD_PATH'] = 'app/static/images'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking, as it can cause performance issues
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'echo_foreign_keys': True}

    login.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    def _fk_pragma_on_connect(dbapi_con, con_record):  # noqa
        dbapi_con.execute('pragma foreign_keys=ON')

    with app.app_context():
        from sqlalchemy import event
        event.listen(db.engine, 'connect', _fk_pragma_on_connect)

    #return app
