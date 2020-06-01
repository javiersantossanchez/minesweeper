FROM nginx

#COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY dist/minesweeper-app .


CMD sed -i 's/listen  .*/listen '"$PORT"';/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'

