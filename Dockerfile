FROM       richarvey/nginx-php-fpm

MAINTAINER "Login Victor" <batazor111@gmail.com>

RUN apt-get update -y && \
    apt-get install -y curl telnet \
      libapache2-mod-php5

# ENV
ENV APP_ENV=local
ENV APP_DEBUG=true
ENV APP_KEY=base64:Dg2i73yA98rIT3drKGoJE8EVLYxZRKQiLCy2Y+CsJhU=
ENV APP_URL=http://localhost

ENV DB_CONNECTION=mysql
ENV DB_HOST=mysql
ENV DB_PORT=3306
ENV DB_DATABASE=labelMap
ENV DB_USERNAME=root
ENV DB_PASSWORD=password

ENV CACHE_DRIVER=file
ENV SESSION_DRIVER=file
ENV QUEUE_DRIVER=sync

ENV REDIS_HOST=127.0.0.1
ENV REDIS_PASSWORD=null
ENV REDIS_PORT=6379

ENV MAIL_DRIVER=smtp
ENV MAIL_HOST=mailtrap.io
ENV MAIL_PORT=2525
ENV MAIL_USERNAME=null
ENV MAIL_PASSWORD=null
ENV MAIL_ENCRYPTION=null

# ADD file project to folder 'src'
WORKDIR     /var/www/html/
RUN         rm -rf *
ADD         labelMap   /var/www/html/
RUN         chown -Rf www-data.www-data /var/www/html/

# Configuration
ADD         tools/conf/nginx-site.conf /etc/nginx/sites-available/default.conf

# Expose Ports
EXPOSE 443
EXPOSE 80

CMD ["/bin/bash", "/start.sh"]
