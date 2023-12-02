"""Entrypoint of our application"""

from flask import Flask
from dotenv import load_dotenv

load_dotenv()

@app.route('/')
def index():
    return "Hello mum"


if __name__ == "__main__":
    print("Creating database tables...")
    app.debug = True
    #app.run()
