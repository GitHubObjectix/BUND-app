FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/BUND-app /usr/share/nginx/html
