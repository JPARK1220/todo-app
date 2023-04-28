from flask import Flask, redirect, url_for, render_template, request, session, g
from models import db, User, ToDO, User_ToDO

# Flask
app = Flask(__name__)

app.secret_key = 'jpark'

app.config['SECRET_KEY'] = '\x14B~^\x07\xe1\x197\xda\x18\xa6[[\x05\x03QVg\xce%\xb2<\x80\xa4\x00'
app.config['DEBUG'] = True

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:jparkjmc@localhost/twofish'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)

# db.create_all()

@app.route("/create-db")
def create_db():
    # redirect(url_for("index"))
    db.create_all()
    return "database successful"

@app.before_request
def before_request():
    g.user = None
    if 'id' in session:
        g.user =  User.query.filter_by(id = session['id']).first()

@app.route("/")
def home_page():
    '''
    Home page
    '''
    if not g.user:
        return redirect(url_for('purgatory'))
    
    username = g.user.username
    tasks = get_user_tasks(username)

    return render_template('homepage.html', username=username, tasks=tasks)

def get_user_tasks(username):
    user = User.query.filter_by(username=username).first()
    if user is None:
        return None
    user_todo_pairs = User_ToDO.query.filter_by(user_id=user.id).all()
    tasks = []
    for user_todo_pair in user_todo_pairs:
        task = ToDO.query.filter_by(id=user_todo_pair.todo_id).first()
        tasks.append(task)
    tasks.sort(key=lambda task: task.order_index)
    return tasks

@app.route("/purgatory")
def purgatory():
    return render_template('purgatory.html')

@app.route("/create-account")
def create_acccount_html():
    return render_template('create_account.html')

@app.route("/login")
def login_html():
    return render_template('login.html')

################### API STARTS HERE ############################################################################

@app.route("/api/create-account", methods=["POST"])
def create_account():

    print("this is content", request.form)

    username = request.form['username']
    password = request.form['password']
    account = User(username=username, password=password)
    print("This is account", account)

    db.session.add(account)
    db.session.commit()

    if account:
        session['id'] = account.id

    return 'success'

@app.route("/api/login", methods=["POST"])
def login():
    print("this is content", request.form)

    username = request.form['username']
    password = request.form['password']

    account = User.query.filter_by(username=username, password=password).first()

    if not account:
        return 'failure'
    
    print("This is account", account)
    session['id'] = account.id
    return 'success'

@app.route("/api/logout", methods=["POST"])
def logout():
    session.pop('id', None)
    return 'success'

@app.route("/api/add-todo", methods=["POST"])
def add_task():

    tasks = ToDO.query.filter_by(user=g.user.id).order_by(ToDO.order_index).all()

    print("this is content", request.form)
    user = User.query.filter_by(id=g.user.id).first()
    print(tasks)
    if len(tasks) == 0:
        todo = ToDO(
            title = request.form['title'],
            description = request.form['description'],
            due_date = request.form['due_date'],
            order_index = 1,
            complete = False,
            user = user.id
        )  # set the user ID to the user object's ID
    else:
        todo = ToDO(
            title = request.form['title'],
            description = request.form['description'],
            due_date = request.form['due_date'],
            order_index = tasks[-1].order_index + 1,
            complete = False,
            user = user.id
        ) 

    print("This is todo", todo)

    db.session.add(todo)
    db.session.commit()

    user_todo = User_ToDO(user_id=user.id, todo_id=todo.id)
    db.session.add(user_todo)
    db.session.commit()

    return "success"

@app.route("/api/edit-todo", methods=["POST"])
def edit_task():

    print("this is content", request.form)

    id = request.form['id']
    todo = ToDO.query.filter_by(id=id).first()
    print(id)

    todo.title = request.form['title']
    todo.description = request.form['description']
    todo.due_date = request.form['due_date']

    db.session.commit()

    return "success"

@app.route("/api/delete-todo", methods=["POST"])
def delete_task():

    todo_id = request.form['id']
    todo = ToDO.query.filter_by(id=todo_id).first()

    user = User.query.filter_by(id=g.user.id).first()

    user_todo = User_ToDO.query.filter_by(user_id=user.id, todo_id=todo_id).first()

    # Delete the user's task
    db.session.query(User_ToDO).filter_by(todo_id=todo.id).delete()
    db.session.delete(todo)
    db.session.commit()

    return 'task successfully deleted'

@app.route("/api/complete-todo", methods=["POST"])
def complete_task():

    todo_id = request.form['id']
    todo = ToDO.query.filter_by(id=todo_id).first()
    todo.complete = True
    db.session.commit()

    return 'task successfully complete'

@app.route("/api/swap-todo", methods=["POST"])
def swap_task():
    # left is -1, right is 1
    left_or_right = int(request.form.get("leftOrRight"))
    print("This is left or right", left_or_right)
    if left_or_right != 1 and left_or_right != -1:
        return "error"
    
    original_todo_id = request.form.get("id")
    original_todo = ToDO.query.filter_by(id=original_todo_id, user=g.user.id).first()

    
    # I asked chatgpt the different ways to query sqlalchemy and it showed me that filter was the more flexible option
    guest_todo = ToDO.query.filter(ToDO.order_index == original_todo.order_index + left_or_right, ToDO.user == g.user.id).first()

    temp = original_todo.order_index
    original_todo.order_index = guest_todo.order_index
    guest_todo.order_index = temp

    db.session.commit()
    return 'swap successfully complete'

if __name__ == "__main__":
    app.run(port=3000)
