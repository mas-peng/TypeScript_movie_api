FROM node:22
# パッケージリストを更新し、vimをインストール
RUN apt-get update && apt-get install -y vim && apt-get clean
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN mkdir dist
