# OuterView
### *An online technical interview platform for interviewers and interviewees to write, run and debug code together in an elegant manner.*

**OuterView** enables users to schedule online meetings, make video and audio calls, and collaboratively write, run, and test code using preset test sets.

This project is developed for *COMP3017J Software Methodology*.

Group members (in alphabetical order): 
+ Jiehongxu Wu (吴界红旭), 
+ Sichen Li (李思辰), 
+ Te Qi (齐特), 
+ Tongyu Wu (吴童宇), and 
+ Ziqin Ma (马子秦). 


## Deployment

### Recommended Environment

+ **Node.js v20.x**
+ **Python 3.11.x**
+ **MySQL 8.1.x**
+ **Yarn 1.x**

### Install packages for the frontend

```shell
yarn install
```

### Set up the database for the backend

0. **Remember to change the password in `.ENV`!**

1. **Create a database in your database management system (in this case, MySQL)**
   ```SQL
   CREATE DATABASE outerview;
   ```

2. **Initialize the database and migrate** 
   ```shell
   flask db init
   ```
   ```shell
   flask db migrate
   ```
   ```shell
   flask db upgrade
   ```

3. **Finally, you can run the server** 
   ```shell
   python app.py
   ```

## Run the project (in dev mode)

### Start the frontend server

```shell
npm run dev
```

### Start the backend server

+ *Two* backend servers are required for running the project.
+ One for the online video meeting functionality (based on Node.js/Koa) and one for handling all the other stuff (based on Python/Flask).

```shell
# Start the Flask sever
npm run start-api
```

```shell
# Start the Node.js server
npm run start-bff
```
