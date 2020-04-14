DROP DATABASE IF EXISTS cofit19_db;
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

CREATE TABLE workouts
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

CREATE TABLE users
(
    id INTEGER
    AUTO_INCREMENT NOT NULL,
email VARCHAR
    (200) NOT NULL UNIQUE,
password VARCHAR
    (60) NOT NULL,
PRIMARY KEY
    (id)
);

CREATE TABLE macros
(
 id INTEGER
    AUTO_INCREMENT NOT NULL,
    heightInput INTEGER (5),
    weightInput INTEGER (5),
    ageInput INTEGER (5),
    genderInput VARCHAR (30),  
    amtExercise VARCHAR (30),  
 
    PRIMARY KEY
    (id)

)