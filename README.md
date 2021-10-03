# 1. Build image
## linsong@linsongdeMacBook-Air NGStore % ng build --prod
## create DockerFile in NGStore/Dockerfile
## linsong@linsongdeMacBook-Air NGStore % mv Dockerfile ./dist
## linsong@linsongdeMacBook-Air NGStore % cd dist 
## linsong@linsongdeMacBook-Air dist % docker build -t angular12 .
# linsong@linsongdeMacBook-Air dist % docker images
  REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
  angular12    latest    d4de5df03fdc   19 seconds ago   56.4MB

# 2. Run container 
## linsong@linsongdeMacBook-Air dist % docker run -d --name demo1 -p 8080:80 angular12
  dd5709a8edb299a45557931bd2bef333aa24a3ec0339ce3131159291b0974c56
## visit: 127.0.0.1:8080

# 3. Clean up
## linsong@linsongdeMacBook-Air dist % docker stop dd5709a8edb29
  dd5709a8edb29
## linsong@linsongdeMacBook-Air dist % docker ps -a 
  CONTAINER ID   IMAGE       COMMAND                  CREATED         STATUS                      PORTS     NAMES
  dd5709a8edb2   angular12   "nginx -g 'daemon of…"   2 minutes ago   Exited (0) 35 seconds ago             demo1
## linsong@linsongdeMacBook-Air dist % docker rm dd5709a8edb2  
  dd5709a8edb2
## linsong@linsongdeMacBook-Air dist % docker rmi d4de5df03fdc
  Untagged: angular12:latest
  Deleted: sha256:d4de5df03fdce6494820c02a38a467188ab226e932485e09efd614de1a0eb0ce

# 4. Docker Hub push
## linsong@linsongdeMacBook-Air dist % docker tag angular12 songlin81/angular12
## linsong@linsongdeMacBook-Air dist % docker push songlin81/angular12:latest  
  The push refers to repository [docker.io/songlin81/angular12]
  c84e4680b7d2: Pushed 
  e6983b701b8b: Pushed 
  90e9f0ac3473: Pushed 
  9f654519d2ae: Pushed 
  9f8566ee5135: Pushed 
  latest: digest: sha256:1460038c33bdcd83b203a1ae4372805ea46627e1c66d4ed6c1b2a588a83bc23e size: 1365

# 5. Docker Hub pull
## linsong@linsongdeMacBook-Air dist % docker pull songlin81/angular12:latest
  latest: Pulling from songlin81/angular12
  53478ce18e19: Already exists 
  cc9de921c04c: Already exists 
  af07f219f9a3: Already exists 
  faf44457d6e5: Already exists 
  9f2815c0b380: Already exists 
  Digest: sha256:1460038c33bdcd83b203a1ae4372805ea46627e1c66d4ed6c1b2a588a83bc23e
  Status: Downloaded newer image for songlin81/angular12:latest
  docker.io/songlin81/angular12:latest
## linsong@linsongdeMacBook-Air dist % docker images                         
  REPOSITORY            TAG       IMAGE ID       CREATED        SIZE
  songlin81/angular12   latest    313e7843926b   32 hours ago   56.4MB

# 6. ngrok
## linsong@linsongdeMacBook-Air Downloads % ./ngrok http 80

# 7. Package Node
## linsong@linsongdeMacBook-Air NGNode % touch Dockerfile
## linsong@linsongdeMacBook-Air NGNode % touch .dockerignore
## linsong@linsongdeMacBook-Air NGNode % docker build . -t songlin81/node-fruit-app
## linsong@linsongdeMacBook-Air NGNode % docker images                             
  REPOSITORY                 TAG       IMAGE ID       CREATED          SIZE
  songlin81/node-fruit-app   latest    c3fadf93c780   36 seconds ago   912MB
## linsong@linsongdeMacBook-Air NGNode % docker run -p 4000:4000 -d songlin81/node-fruit-app
  bf0220689cc83fdabd8e9a308b6ffbf0175f09f2a21eed92ab408318c9bbf518
## linsong@linsongdeMacBook-Air NGNode % docker logs bf0220689cc8
  Server started on port 4000
## linsong@linsongdeMacBook-Air NGNode % docker exec -it bf0220689cc8 /bin/bash
## root@bf0220689cc8:/usr/src/app# ls
  Dockerfile  fruits.js  node_modules  package-lock.json  package.json  server.js
## root@bf0220689cc8:/usr/src/app# exit
  exit
## linsong@linsongdeMacBook-Air NGNode % docker push songlin81/node-fruit-app:latest

# 8. Docker Volume
## linsong@linsongdeMacBook-Air ngrx_pocs-main % docker volume create fruit-node 
  fruit-node
## linsong@linsongdeMacBook-Air ngrx_pocs-main % docker inspect fruit-node 
  [
      {
          "CreatedAt": "2021-10-01T12:23:54Z",
          "Driver": "local",
          "Labels": {},
          "Mountpoint": "c",
          "Name": "fruit-node",
          "Options": {},
          "Scope": "local"
      }
  ]
## linsong@linsongdeMacBook-Air ngrx_pocs-main % docker volume rm fruit-node 
  fruit-node
## linsong@linsongdeMacBook-Air ngrx_pocs-main % docker inspect fruit-node 
  []
  Error: No such object: fruit-node
## linsong@linsongdeMacBook-Air NGNode % docker build . -t songlin81/node-fruit-app
## insong@linsongdeMacBook-Air NGNode % docker images
  REPOSITORY                 TAG       IMAGE ID       CREATED          SIZE
  songlin81/node-fruit-app   latest    77583c891812   12 seconds ago   912MB
  songlin81/angular12        latest    313e7843926b   3 days ago       56.4MB
## linsong@linsongdeMacBook-Air NGNode % docker run --name fruit-node -p 4000:4000 -d -v /Users/linsong/Downloads/ngDocker/voldata/:/fruitdata songlin81/node-fruit-app
  4053ed9e15aa229da7bc5d74e15e1e52b54b915248aed455edf43ec860d21457
## 

# 9. Docker Compose
## linsong@linsongdeMacBook-Air NGNode % docker-compose -v
  docker-compose version 1.29.2, build 5becea4c
## linsong@linsongdeMacBook-Air ngrx_pocs-main % cd Compose && touch docker-compose.yml
## linsong@linsongdeMacBook-Air Compose % docker-compose up
## linsong@linsongdeMacBook-Air Compose % docker-compose stop
## linsong@linsongdeMacBook-Air Compose % docker-compose ps
        Name                     Command               State                     Ports                  
  -------------------------------------------------------------------------------------------------------
  compose_datanode_1   docker-entrypoint.sh node  ...   Up      0.0.0.0:4000->4000/tcp,:::4000->4000/tcp 
  compose_web_1        nginx -g daemon off;             Up      443/tcp, 0.0.0.0:80->80/tcp,:::80->80/tcp
