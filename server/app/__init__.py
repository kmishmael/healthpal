#!/usr/bin/python3

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.config import get_config
from flask_cors import CORS
from flask_bcrypt import Bcrypt

cors = CORS()
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(get_config(config_name))

    from .api import api_blueprint

    app.register_blueprint(api_blueprint)
    cors.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    app.debug = True  # Enable debug mode
    def _fk_pragma_on_connect(dbapi_con, con_record):  # noqa
        print('exe')
        dbapi_con.execute('pragma foreign_keys=ON')

    with app.app_context():
        from sqlalchemy import event
        event.listen(db.engine, 'connect', _fk_pragma_on_connect)
    return app
