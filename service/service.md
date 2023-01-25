Service
=======

### project setup:
1. create a new pure python project from the terminal/MacOS (Don't use IDE template create the project);
2. create a virtual environment: `python -m venv venv`;
3. activate virtual environment: `source venv/bin/activate` (deactivate virtual environment: `deactivate`);
   >Note: all python and pip command have already been aliased to python3 and pip3 in `.zshrc`;
4. copy the requirements of a fast api project and run `pip install -r service_rqms.txt`
   >run this either in terminal directly or in pycharm terminal window;
5. open all python file in pycharm and make sure all the dependencies are installed.

### local mongoDB setup:
1. start docker desktop app, download [docker desktop](https://www.docker.com/products/docker-desktop/)
2. pull the latest mongoDB docker image: `docker pull mongodb:latest`, for more info checkout [office mongodb image on docker hub](https://hub.docker.com/_/mongo)
3. start the docker container: `docker run --name <container_name> --port 27017:27017 -d mongodb:latest`
4. use mongo compass to import data by create a new database and a new collection(for menu data use d3.dishes) and click `ADD DATA` button and chose import file from `/data`

