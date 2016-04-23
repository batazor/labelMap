# LabelMap

The app allows you to create labels on the map.

## RUN

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=labelMap -d postgres

docker build -t labelmap .
docker run -it --name labelMap --link some-postgres:postgres -v `pwd`/labelMap:/var/www/html/ labelmap
```
