DROP DATABASE IF EXISTS cofit19_db;
CREATE DATABASE cofit19_db;

USE cofit19_db;

CREATE TABLE users
(
    id INTEGER
    AUTO_INCREMENT NOT NULL,
email VARCHAR
    (200) NOT NULL UNIQUE,
password VARCHAR
    (60) NOT NULL,
    bmi DECIMAL
    (50),
    calories INTEGER
    (100),
    dailyLog VARCHAR
    (500),
PRIMARY KEY
    (id)
);

    CREATE TABLE macros
    (
        id INTEGER
        AUTO_INCREMENT NOT NULL,
    heightInput INTEGER
        (5),
    weightInput INTEGER
        (5),
    ageInput INTEGER
        (5),
    genderInput VARCHAR
        (30),  
    amtExercise VARCHAR
        (30),  
 
    PRIMARY KEY
        (id)
)