# Outerview (Tentative name)
### An online technical interview platform for interviewers and interviewees to write, run and debug code together in an elegant manner.

Group members (in alphabetical order): 
+ Jiehongxu Wu (吴界红旭), 
+ Sichen Li (李思辰), 
+ Te Qi (齐特), 
+ Tongyu Wu (吴童宇), and 
+ Ziqin Ma (马子秦). 



### 安装依赖

```yarn install ```

##### For set up the databasem:

**Create a database in your database management system (in this case, MySQL)**
```
CREATE DATABASE outerview;
```
**Remember to change the password in __init__.py!**

**Initialize and migrate the database:** 
```shell
flask db init
```
```shell
flask db migrate
```
```shell
flask db upgrade
```
**Finally, run the server:** 
```shell
python app.py

### 开发模式
* 前端
   ```npm run dev```

* 后端
  ```npm run start-api```
