# A multiplayer realtime Tic Tac Toe game

# [Play game](https://jedah.netlify.app/) 

A full stack multiplayer Tic Tac Toe game built with React, Django framework,django channels and redis.

### Features
- 3x3 game grid
- Persistent scoreboard (data stored in SQL database)
- multiplayer with django channels and websockets
- Two human players with different device

### Prerequisites:
- [Python 3](https://www.python.org) (>=3.7)
- [pip](https://pip.pypa.io/en/stable/installing/) (included in Python 3 >=3.4 )
- [pipenv](https://docs.pipenv.org/en/latest/)

In oder to start the game, do the following:

### 1) Start backend (default on localhost:8000)

```
$ pipenv shell
$ cd backend
$ python manage.py runserver
```

### 2) Start frontend (default on localhost:3000)

```
$ cd frontend
$ yarn start
```

Then, open [http://localhost:3000](http://localhost:3000) to view the game in the browser. Have fun 🕹!
