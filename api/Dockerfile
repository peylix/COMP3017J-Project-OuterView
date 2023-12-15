# 使用最新版本的 Python 镜像作为基础镜像
FROM python:latest

# 添加作者标签
LABEL authors="Sichen Li"

# 设置工作目录，所有后续命令将在这个目录中执行
WORKDIR /app

# 将当前目录的所有文件复制到容器的 /app 目录中
COPY . /app

# 安装应用程序的依赖项，requirements.txt 包含了所有需要的 Python 库
RUN pip3 install -r requirements.txt

# 定义容器启动时要运行的命令
CMD ["python", "app.py"]

# 暴露容器内的端口，允许外部访问
EXPOSE 5100
