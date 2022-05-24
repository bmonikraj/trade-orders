CREATE TABLE user (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT NOT NULL, 
	fullname TEXT NOT NULL, 
	password_hash TEXT NOT NULL,
    UNIQUE (username,fullname)
);

CREATE TABLE price (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	`date` DATE NOT NULL,
	price REAL NOT NULL,
	instrument_name TEXT NOT NULL,
    UNIQUE (instrument_name,`date`)
);
