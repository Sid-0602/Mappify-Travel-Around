# Mappify-Travel-Around

This is full-stack application created to give platform to travellers to share experience and Add Pins to their destinations.

## How to Use:

Visit the website and directly view the alredy created pins on Map. If you want to create a new Pin, you need to login.

### TechStack:

* Frontend (CLIENT) : ReactJS and JavaScript.
* Backend (SERVER) : NodeJS, Express and JavaScript.
* Databases: Mongoose Library and MongoDB (nosql).
* External APIs: Mapbox API to access World Map.
* Docker and Docker-Compose for contenerization.
* AWS EC2 for deployment.

### Docker and Docker Compose

Pull Docker image: 

`docker pull sidjadhav/mappify-server:1.0.0.RELEASE`

#### Docker Compose deployment:

```
docker-compose up # to start
docker-compose down # to end
```

#### Pushing new image:

```
docker login
docker pull sidjadhav/mappify-server:0.0.0:RELEASE
docker build -t sidjadhav/mappify-server:0.0.0:RELEASE
docker push sidjadhav/mappify-server:0.0.0:RELEASE
```
