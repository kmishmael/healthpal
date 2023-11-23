"""Entrypoint of our application"""

from flask import Flask
from dotenv import load_dotenv
from app import app, db

load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello mum"


if __name__ == "__main__":
    print("Creating database tables...")
    db.create_all()
    app.run()
