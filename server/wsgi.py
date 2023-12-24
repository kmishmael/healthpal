import os
from app import create_app, db

app = create_app(os.getenv("FLASK_ENV", "production"))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(port=8000)
