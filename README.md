### Test backend to setup Nginx/Cloudflare <br/><br/>

![Pic](/img/pi-proxman.png)

<br/>

[Video Overview](https://youtu.be/BjJu43Lsxws)

#### If you only want the app - clone and run local or as container

<br/>

#### Run as local app

```shell
cd nodebackend
npm i
npm start
```

#### run as container - note use any tag [-t] you like

```shell
cd nodebackend
docker build -t nodebackend .
docker images
docker run -d  -p 4000:4000 --name nodebackendcontainer nodebackend
```

#### Structure app.js->route.js->controller.js->service.js->db.js

<br/>

Contrived file names to make it easy to follow<br/>
Note these could be folders of same name in actual app with multiple files<br/>
Great blog post on express api structure below<br/>
https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way

#### Files:

app.js - run backend server<br/>
route.js - direct endpoint calls to controller<br/>
controller.js - strip out request data -> validate it -> call service<br/>
service.js - business logic (maybe better to validate here) -> shape data -> call db<br/>
db.js - calls to backend storage (database.json) - change to any backend storage<br/><br/><br/>

[Video Overview](https://youtu.be/BjJu43Lsxws)

#### Setup Docker, Nginx Proxy Manager, Cloudflare DSN to point a domain at your server

<br/>

#### I bought raspberrypi.training for $6 on namecheap.com

<br/>

#### Note I'm using RaspberryPI OS Server 64-bit

#### Ubuntu works great too

<br/>



#### Update PI

```shell
sudo apt update && sudo apt upgrade -y
```

<br/>

#### Install Docker

[web link](https://docs.docker.com/engine/install/)

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
```

```shell
sudo sh get-docker.sh
```

```shell
sudo groupadd docker
```

```shell
sudo usermod -aG docker $USER
```

```shell
newgrp docker
```

```shell
sudo reboot now
```

<br/>

#### Test then delete

```shell
docker run hello-world
```

```shell
docker rmi hello-world -f
```

<br/>

#### Install Portainer

[web link](https://docs.portainer.io/start/install/server/docker/linux)

```shell
docker volume create portainer_data
```

```shell
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

<br/>

#### Login to portainer

- https://localhost:9443
- create password >= 12 chars
- 'Create User'

<br/>

#### Restart portainer container if necessary

```shell
docker restart portainer
```

<br/>

#### Install docker compose plugin

[web link](https://docs.docker.com/compose/install/linux/)

```shell
sudo apt update
```

```shell
sudo apt install docker-compose-plugin -y
```

```shell
docker compose version
```

<br/>

#### Install nginx proxy mananger (finally)

[web link](https://nginxproxymanager.com/setup/#running-the-app)

```shell
sudo nano docker-compose.yml
```

```nano
version: "3"
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      # These ports are in format <host-port>:<container-port>
      - '80:80' # Public HTTP Port
      - '443:443' # Public HTTPS Port
      - '81:81' # Admin Web Port
      # Add any other Stream port you want to expose
      # - '21:21' # FTP
    environment:
      DB_MYSQL_HOST: "db"
      DB_MYSQL_PORT: 3306
      DB_MYSQL_USER: "npm"
      DB_MYSQL_PASSWORD: "npm"
      DB_MYSQL_NAME: "npm"
      # Uncomment this if IPv6 is not enabled on your host
      # DISABLE_IPV6: 'true'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    depends_on:
      - db

  db:
    image: 'yobasystems/alpine-mariadb:latest'
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: 'npm'
      MYSQL_DATABASE: 'npm'
      MYSQL_USER: 'npm'
      MYSQL_PASSWORD: 'npm'
    volumes:
      - ./data/mysql:/var/lib/mysql
```

```nano
ctrl+x
y
```

```shell
docker compose up
```

<br/>

#### Pull nodebackend container - or clone this repo and build yourself.

##### Instructions to build yourself top of this file

```shell
docker pull prichardsondev/nodebackend
```

```shell
docker run -d  -p 4000:4000 --restart unless-stopped --name nodebackendcontainer prichardsondev/nodebackend
```

```shell
piIP:4000 or piName.local:4000
```

<br/>

#### Install Cloudflare DDNS

[weblink](https://hub.docker.com/r/oznu/cloudflare-ddns)

- move domain name servers to cloudflare
- create api key

![Pic](/img/apikey.png)

#### Create oznu/cloudflare-ddns container

```shell
id $user
```

```nano
version: '2'
services:
  cloudflare-ddns:
    image: oznu/cloudflare-ddns:latest
    restart: always
    environment:
      - API_KEY=xxxxxxx
      - ZONE=example.com
      - PROXIED=true
      - PUID=xxxx
      - PGID=xxxx
```

#### Forward port 80 and 443 to server ip address

```code
Linksys -> Security -> Apps and Gaming -> Single Port Forwarding

AppName External Port   Internal Port   Protocol    Device IP#
http       80              80           Both       192.168.1.n
https      443             443          Both       192.168.1.n
```
