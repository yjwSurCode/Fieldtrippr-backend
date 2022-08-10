FROM node:14.17.0

# # 添加镜像
# RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# # 统一时间
# RUN apk --update add tzdata \
#     && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
#     && echo "Asia/Shanghai" > /etc/timezone \
#     && apk del tzdata

#设置时区
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo 'Asia/Shanghai' >/etc/timezone \

# 在容器中创建一个目录
RUN mkdir -p /usr/src/nodejs/

# 下一步在镜像中创建一个文件夹存放应用程序代码，这将是你的应用程序工作目录：
WORKDIR /usr/src/nodejs/

# copy code
# 把当前目录下的所有文件拷贝到 Image(镜像) 的 /usr/src/nodejs/ 目录下
COPY . /usr/src/nodejs/

RUN npm install 

EXPOSE 3000

CMD npm start
