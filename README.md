# LabelMap

The app allows you to create labels on the map.

## RUN

```bash
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=labelMap -d mysql

docker build -t labelmap .
docker run -it --name labelMap --link mysql:mysql -v `pwd`/labelMap:/var/www/html/ labelmap
```
