CREATE DATABASE cofit19_db;

USE cofit19_db;

CREATE TABLE customFood
(
    id INTEGER
    AUTO_INCREMENT NOT NULL,
    name VARCHAR
    (200), 
    calories VARCHAR
    (200), 
    fat VARCHAR
    (200),
    protein VARCHAR
    (200),
    PRIMARY KEY
    (id)
);

    CREATE TABLE customWorkouts
    (
        id INTEGER(100),
        workouts VARCHAR (200),
        PRIMARY KEY(id)
    );

    CREATE TABLE dailyLog
    (
        id INTEGER(100),
        macros VARCHAR (200),
        PRIMARY KEY(id)
    );

