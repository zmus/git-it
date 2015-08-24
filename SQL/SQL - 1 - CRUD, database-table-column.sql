/*

Database -> Table -> Column -> Row

*
  = all

'' 
  = string
  * [S]ingle quotes are for [S]trings ; [D]ouble quotes are for things in the [D]atabase

Primary key (ID)
  * unique
  * never blank or empty
  * when inserting a new row is automatically
    * incremented
    * inserted

Field with missing data has a value of NULL (placeholder).

Line comments
  -- carriage return
Block comments
  this

*/

/*------------------------------------------------------------------------------
                                     Read
------------------------------------------------------------------------------*/

SELECT columns
FROM table
WHERE condition
  + comparison: 
    = 
    > >= < <=
    <> or !=

AND condition
OR condition
ORDER BY column 
  * default: ascending
  + DESC = descending

--------------------------------------------------------------------------------
SELECT * FROM movies WHERE title = 'The Kid';
select id, title from movies where duration >= 68 and genre = 'Horror' order by duration;

SELECT title FROM Movies WHERE id IN (2,3); --> WHERE id = 2 OR id = 3
--------------------------------------------------------------------------------

SELECT DISTINCT(column) FROM table
WHERE column LIKE '%ton%';  -->  Rows that contain 'ton' in a given column and
                            --   are distinct.

/*------------------------------------------------------------------------------
                                    Create
------------------------------------------------------------------------------*/

INSERT INTO table (columns)
VALUES 
  (values), 
  (values)...

--------------------------------------------------------------------------------
INSERT INTO movies (id, title, genre, duration)
VALUES (5, 'Nosferatu', 'Comedy', 94);

-- Can be shortened, because we insert data into all the columns
INSERT INTO movies 
VALUES 
  (5, 'Nosferatu', 'Comedy', 94),
  (6, 'Home Alone', 'Horror', 85);

/*------------------------------------------------------------------------------
                                    Update
------------------------------------------------------------------------------*/

UPDATE table
SET column = value
[WHERE condition]
  * if not provided, updates entire column

--------------------------------------------------------------------------------
UPDATE movies 
SET genre = 'Comedy', duration = 70
WHERE id = 3 OR id = 5;

/*------------------------------------------------------------------------------
                                    Delete
------------------------------------------------------------------------------*/

DELETE FROM table 
[WHERE condition]
  * if not provided, deletes ALL data from a table

--------------------------------------------------------------------------------
DELETE FROM movies WHERE title = 'Nosferatu' OR duration > 120;

/*------------------------------------------------------------------------------
                                   Database
------------------------------------------------------------------------------*/

CREATE DATABASE name;

DROP DATABASE name;

/*------------------------------------------------------------------------------
                                    Table
------------------------------------------------------------------------------*/

CREATE TABLE name
(
column datatype,
...
column datatype
);

DROP TABLE name;

--------------------------------------------------------------------------------
CREATE TABLE movies
(
id int, -- should be set as a primary-key 
title varchar(20),
genre varchar(100),
duration int
);

DROP TABLE movies;

/*------------------------------------------------------------------------------
                                   Column
------------------------------------------------------------------------------*/

-- ALTER TABLE is used to add/modify/remove columns 

ALTER TABLE name  
ADD COLUMN name datatype;

ALTER TABLE name  
DROP COLUMN name;

--------------------------------------------------------------------------------
ALTER TABLE movies ADD COLUMN ratings int;