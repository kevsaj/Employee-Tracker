DROP DATABASE IF EXISTS employeesdb;
CREATE DATABASE employeesdb;
USE employeesdb;
CREATE TABLE EMPLOYEES( id INT NOT NULL auto_increment,
                        first_name VARCHAR ( 30 ) NOT NULL,
                        last_name VARCHAR ( 30 ) NOT NULL,
                        title VARCHAR ( 30 ) NOT NULL,
                        department VARCHAR ( 80 ) NOT NULL,
                        salary DECIMAL NOT NULL,
                        manager VARCHAR ( 80 ) NOT NULL,
                        PRIMARY KEY ( id ) );
CREATE TABLE DEPARTMENT( id INT NOT NULL auto_increment,
                        department_name VARCHAR ( 30 ) NOT NULL,
                        PRIMARY KEY ( id ) );
CREATE TABLE _ROLE( id INT NOT NULL auto_increment,
                        first_name VARCHAR ( 30 ) NOT NULL,
                        last_name VARCHAR ( 30 ) NOT NULL,
                        title VARCHAR ( 30 ) NOT NULL,
                        department_id INT NOT NULL,
                        salary DECIMAL NOT NULL,
                        manager VARCHAR ( 80 ) NOT NULL,
                        PRIMARY KEY ( id ) );              
INSERT INTO EMPLOYEES(first_name, last_name, title, department, salary, manager)
VALUES ('Mama', 'Yo', 'CEO', 'Everything', 1000000, 'The Almighty');
INSERT INTO EMPLOYEES(first_name, last_name, title, department, salary, manager)
VALUES ( 'Indiana', 'Jones', 'CTO', 'Everything', 999999, 'Mama, Yo');
INSERT INTO EMPLOYEES(first_name, last_name, title, department, salary, manager)
VALUES ( 'Edna', 'Mode', 'Designer', 'UI/UX', 999998, 'Mama, Yo' );
INSERT INTO EMPLOYEES(first_name, last_name, title, department, salary, manager)
VALUES ( 'Marty', 'McFly', 'Chicken', 'Sales', 10, 'Mama, Yo' );
INSERT INTO EMPLOYEES(first_name, last_name, title, department, salary, manager)
VALUES ( 'Clark', 'Kent', 'Journalist', 'Production', 50, 'Lois Lane' );