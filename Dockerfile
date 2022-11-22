FROM nginx:latest
COPY ./dist /usr/share/nginx/html
COPY ./bms.conf /etc/nginx/conf.d
EXPOSE 80