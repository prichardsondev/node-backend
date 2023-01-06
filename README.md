#### run as local app

```shell
cd nodebackend
npm i
npm start
```

#### run as container - note use an tag [-t] you like

```shell
cd nodebackend
docker build -t nodebackend .
docker images
docker run -d  -p 4000:4000 --name nodebackendcontainer nodebackend
```

#### Structure app.js->route.js->controller.js->service.js->db.js <br/>

Contrived file names to make it easy to follow<br/>
Note these could be folders of same name in actual app with multiple files<br/>
Great blog post on express api structure below<br/>
https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way

#### Files:

app.js - run backend server<br/>
route.js - direct endpoint calls to controller<br/>
controller.js - strip out request data -> validate it -> call service<br/>
service.js - business logic (maybe better to validate here) -> shape data -> call db<br/>
db.js - calls to backend storage (database.json) - change to any backend storage<br/>
