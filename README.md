# OuterView
### *An online technical interview platform for interviewers and interviewees to write, run and debug code together in an elegant manner.*

OuterView provides its users with the ability to schedule meetings, make video and audio calls, co-write and run code, and test the code with preset test sets.

Group members (in alphabetical order): 
+ Jiehongxu Wu (吴界红旭), 
+ Sichen Li (李思辰), 
+ Te Qi (齐特), 
+ Tongyu Wu (吴童宇), and 
+ Ziqin Ma (马子秦). 


## 部署要求

**Flask 2.3.x, MySQL 8.1.x, Python 3.11.x, Yarn 1.x**

### 前端安装依赖

```shell
yarn install
```

### For setting up the database:

**1. Create a database in your database management system (in this case, MySQL)**
```SQL
CREATE DATABASE outerview;
```
**2. Remember to change the password in `.ENV`!**

**3. Initialize and migrate the database:** 
```shell
flask db init
```
```shell
flask db migrate
```
```shell
flask db upgrade
```
**4. Finally, run the server:** 
```shell
python app.py
```

## 开发模式

### 前端
   ```shell
   npm run dev
   ```

### 后端

+ 开发模式需要开两个后端服务器
+ 一个用于预约(python实现)，一个用于会议（nodejs实现）

  ```shell
  npm run start-api
  ```
  ```shell
  npm run start-bff
  ```
