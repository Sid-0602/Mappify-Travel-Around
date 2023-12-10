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

### Preview of Application: 
#### Overview: 
![image](https://github.com/Sid-0602/Mappify-Travel-Around/assets/86071680/af841599-37ea-46d6-b34b-df1bd509bca2)
#### Register and Login Window: 
![image](https://github.com/Sid-0602/Mappify-Travel-Around/assets/86071680/a434eb85-18fd-4f63-8add-18fffb7cf248)
![image](https://github.com/Sid-0602/Mappify-Travel-Around/assets/86071680/37c99c8f-b57c-4420-8e13-af7a9b4e2294)

#### View Pins when logged in: 
![image](https://github.com/Sid-0602/Mappify-Travel-Around/assets/86071680/9ce832f2-ed47-48ab-9f7c-87a7ad3afba4)

#### Crate a Pin and share experience: 
![image](https://github.com/Sid-0602/Mappify-Travel-Around/assets/86071680/f6a41e23-c3cd-425c-8bc7-b66b0a9eb046)
![image](https://github.com/Sid-0602/Mappify-Travel-Around/assets/86071680/f846d99a-c251-4a06-b29f-5e71b3fce047)


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
