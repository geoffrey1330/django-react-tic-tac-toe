# Tic Tack Toe game

Tic Tack Toe game built with React and Django framework.

### Features
- 3x3 game grid
- Persistent scoreboard (data stored in SQL database)
- Two human players with editable names

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
