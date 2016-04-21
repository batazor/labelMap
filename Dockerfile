FROM       richarvey/nginx-php-fpm

MAINTAINER "Login Victor" <batazor111@gmail.com>

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
