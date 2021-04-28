
FROM nginx:1.15.2-alpine
COPY ./build /var/www
COPY ./ssl /etc/nginx/ssl
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]