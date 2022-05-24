# Sample Application to build Trade order platform

## Operating System Machine Setup

- RHEL 8 version
- `sudo dnf upgrade -y`
- `sudo dnf group install "Development Tools"`
- `sudo dnf install sqlite`
- `git clone https://github.com/bmonikraj/trade-orders.git`
- `cd trade-orders`


## Database 

*SQLite3* is being used as database. 

- `cd database`
- `sqlite3 trade.db < tables.sql`
- `sqlite3 trade.db`
- `.mode csv`
- `.import historical_prices.csv price_tmp`
- `INSERT INTO price(`date`,price,instrument_name) SELECT * FROM price_tmp;`
- `DROP TABLE price_tmp;`
- `.quit`
- `cd ..`


## API

- `cd api`
- `pip3 install pipenv`
- `pipenv shell`
- `pipenv install --dev`
- `nohup python __main__.py PROD &`
- Log file is present at `application.log` file
- `exit`
- `cd ..`

In `aap.env` file, the key value pairs are to manage the deployment properties. 

- HOST : Application host
- PORT : Application port
- SECRET : secret used for jwt

**Security (Web)**

The standard web security is followed with username and password. If successful login, then token (as jwt) is shared in response, which needs to be passed as 'X-Token' header with subsequent requests for validation. 

## UI

- `cd ui`
- `npm install --save`
- `npm start`
- In browser, go to `http://localhost:3000`

## Postman Collection

- Postman collection is present in the repository, to interact with APIs directly.