import os
from dotenv import load_dotenv
from server.app import create_app


app = create_app(os.getenv("FLASK_ENV", "development"))

load_dotenv()
if __name__ == "__main__":
    app.run()
