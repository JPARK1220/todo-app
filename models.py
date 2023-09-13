from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'
    
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(256), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    # pass

class ToDO(db.Model):
    __tablename__ = 'ToDO'

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(256), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    order_index = db.Column(db.Integer, autoincrement=True, nullable=False)
    complete = db.Column(db.Boolean, nullable=False, default = False)

    user = db.Column(db.Integer)

class User_ToDO(db.Model):
    __tablename__ = 'User_ToDO'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    todo_id = db.Column(db.Integer, db.ForeignKey('ToDO.id'), nullable=False)






