from app import app, db, login

@app.route('/', methods=['GET', 'POST'])
def index():
    db.session()
    return "hello mum"
