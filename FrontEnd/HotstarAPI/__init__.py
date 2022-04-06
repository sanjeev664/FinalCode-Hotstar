from flask import Flask
from os import path
from flask_cors import CORS
from flask_login import LoginManager

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'HotstarCloneAPI'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return id

    return app


