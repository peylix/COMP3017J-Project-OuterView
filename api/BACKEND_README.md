Login to your MYSQL and create the database in the terminal:
```
CREATE DATABASE outerview;
```
Change the password in __init__.py

Initialize and migrate the database (Note that the path to the console needs to be in FlaskServer):
```shell
flask db init
```
```shell
flask db migrate
```
```shell
flask db upgrade
```
Finally, run the server:
```shell
python app.py
```