#  使用官方Node.js基础镜像
FROM  node:14

#  设置工作目录
WORKDIR  /src

#  将package.json和package-lock.json复制到工作目录
COPY  package*.json  ./
COPY  vite.config.ts ./
COPY  tailwind.config.js ./
COPY  postcss.config.js ./
COPY  tsconfig.json ./
COPY  tsconfig.node.json ./





#  安装Python依赖
# RUN  apt-get  update  &&  \
#       apt-get  install  -y  python3-pip  &&  \
#      pip3  install  --no-cache-dir  numpy

#  复制项目文件到工作目录（注意：这里您可以根据实际情况调整）
COPY  .  .

#  安装依赖
RUN  npm install

#  暴露容器端口（请根据实际情况调整）
EXPOSE  3999

#  启动应用程序
CMD  ["npm","run","dev"]
