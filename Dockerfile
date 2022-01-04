FROM nginx:1.17-alpine
#WORKDIR /
COPY /dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
EXPOSE 9080
CMD ["nginx", "-g", "daemon off;"]