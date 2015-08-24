/*==============================================================================
  Aggregate Functions
==============================================================================*/

/* Get the total number of rows in the table. (rows with NULL included) */

SELECT count(*)
FROM table;

/* If a value is NULL, row is ignored. */

count(column)
  = total number of rows
sum(column)
  = sum of values
avg(column)
  = average value
max(column)
  = largest value
min(column)
  = smallest value


SELECT max(tickets), min(tickets) FROM Movies;
SELECT count(*) FROM Actors WHERE country = 'USA';

/*==============================================================================
  GROUP BY  
    = condense a group of columns into a single row
  HAVING
    = conditionally restrict the groups of rows 
==============================================================================*/

SELECT column, aggregate_function(column)
FROM table
[WHERE column operator value]
GROUP BY column
HAVING aggregate_function(column) operator value;


/*  Return actor's salaries by countries. 

      country |      sum
    ----------+---------------
     USA      | 3500000000.00
     Croatia  | 100.00
*/
SELECT country, sum(salary)
FROM Actors
WHERE role = 'supporting'
GROUP BY country
HAVING count(*) > 1; /* More than 1 actor per group */

/*==============================================================================

                                Constraints

  = Prevent NULL values
  = Ensure column values are UNIQUE
  = Provide additional VALIDATIONS

  The default behavior of DBS tables can be too permisive.
==============================================================================*/

NOT NULL
  = ensures values cannot be NULL

UNIQUE

CHECK (column operator value)
  = validate the value 

PRIMARY KEY 
  = NOT NULL + UNIQUE
  * can only be defined once per table!

REFERENCES table(column)
  = foreign key constraint
  * in absence of a column, the primary key of the referenced table is used

/*------------------------------------------------------------------------------
                               Column Constraint
------------------------------------------------------------------------------*/

column datatype constraints

--------------------------------------------------------------------------------

CREATE TABLE Movies
(
  id int PRIMARY KEY,
  name varchar(50) NOT NULL UNIQUE,
  genre varchar(15),
  duration int CHECK (duration > 0)
);

INSERT INTO Movies (id, genre)
VALUES (3, 'Horror');
/*
ERROR: null value in column "name" violates not-null constraints
DETAIL: Failing row contains (3, null, Horror)
*/

INSERT INTO Movies 
VALUES (3, 'Star Wars', 'Adventure');
/*
ERROR: duplicate key value violates unique constraint "movies_name_key"
DETAIL: Key (name) = (Star Wars) already exists.

"movies_name_key" is the constraint name auto-assigned by the DBS. 
*/

/*------------------------------------------------------------------------------ 
                               Table Constraint

  * except for NOT NULL, every column constraint can be written as a table 
    constraint
  * has a name => easier to find in case it needs to be altered
  * can be used for multiple columns
------------------------------------------------------------------------------*/

CONSTRAINT name constraint!=not_null (columns)

--------------------------------------------------------------------------------

CREATE TABLE Movies
(
  id int,
  name varchar(50) NOT NULL,
  genre varchar(15),
  duration int,
  /* same name AND genre */
  CONSTRAINT unique_name UNIQUE (name, genre),
  CONSTRAINT check_duration CHECK (duration > 0) 
);

INSERT INTO Movies 
VALUES (3, 'Star Wars', 'Adventure');
/*
ERROR: duplicate key value violates unique constraint "unique_name"
DETAIL: Key (name, genre) = (Star Wars, Adventure) already exists.
*/

/*==============================================================================
                         References Between 2 Tables

  Foreign key
    = column that references the primary key column of another table 
    * naming convention:
      "singular version of the table you're referencing + _ + column name"
==============================================================================*/

item_column datatype REFERENCES items(column)

--------------------------------------------------------------------------------

/* The table being referenced must be created FIRST */

CREATE TABLE Movies
(
  id int PRIMARY KEY,
  name varchar(50) NOT NULL UNIQUE
);

/* column constraint syntax */

CREATE TABLE Genres
(
  id int PRIMARY KEY,
  movie_id int REFERENCES movies(id),
  /* OR */
  movie_id int REFERENCES Movies,
  name varchar(50)
);

/* table constraint syntax */

CREATE TABLE Genres
(
  id int PRIMARY KEY,
  movie_id int,
  name varchar(50),
  FOREIGN KEY (movie_id) REFERENCES Movies (id)
);

/*------------------------------------------------------------------------------ 
                              Orphan records

  = a row containing a FOREIGN KEY that references a missing row in another table
  * Avoided by using FOREIGN KEY constraint
  * Tables must be dropped in the correct order
------------------------------------------------------------------------------*/

DELETE FROM Movies WHERE id = 6;
/*
ERROR: update or delete on table "movies" violates foreign key constraint
"genre_movie_id_fkey" on table "genre"
DETAIL: Key (id)=(6) is still referenced form table "promotions".
*/
DELETE FROM Genres WHERE movie_id = 6;
DELETE FROM Movies WHERE id = 6;

--------------------------------------------------------------------------------

DROP TABLE Movies;
/*
ERROR: cannot drop table movies because other objects depend on it
DETAIL: constraint genres_movie_id on table genres depends on table movies
*/
DROP TABLE Genres;
DROP TABLE Movies;

/*==============================================================================

                                Normalization

  = process of reducing duplication in database tables

  1st Normal Form Rule: 
    "Tables must not contain repeating groups of data in 1 column."

  2nd Normal Form Rule:
    "Tables must not contain redundancy (unnecessary repeating information)."

  step 1: If a table has repeating values, divide it into two 
  step 2: Create a join table

  Naming convention: TableA_TableB
          
==============================================================================*/

CREATE TABLE Movies_Genres  
(
  movie_id int references movies(id),
  genre_id int references genres(id)
);

-- How do we find genres of a movie?
SELECT id FROM Movies WHERE title = "Home Alone";       --> 2
SELECT genre_id FROM Movies_Genres WHERE movie_id = 2;  --> 3,7
SELECT genre FROM Genres WHERE id = 3 or id = 7;
                         WHERE id IN (2,3);  -- alternate syntax

/*==============================================================================

                                Relationships

  * One-to-One
      1 customer     ...     1 adress
      +---------+           +---------+
      | Table A |-----------| Table B |
      +---------+ 1       1 +---------+ 

  * One-to-Many
        1 movie      ...    many reviews
      +---------+           +---------+
      | Table A |-----------| Table B |
      +---------+ 1       * +---------+ 

      ALTER TABLE Reviews  
      ADD COLUMN movie_id int references movies(id);

  * Many-to-Many ()
        1 movie      ...    many genres
      many movies    ...      1 genre
      +---------+           +---------+
      | Movies  |-----------| Genres  |
      +---------+ *       * +---------+ 

      CREATE TABLE Movies_Genres
      (
        movie_id int references movies(id),
        genre_id int references genres(id)
      );

  We omit the join table in diagrams!

==============================================================================*/

/*==============================================================================

                                Inner Joins

  * 
==============================================================================*/

/* Movies:  id  title  genre  duration
   Reviews: id  review  movie_id */

SELECT Movies.title, Reviews.review
FROM Movies
INNER JOIN Reviews
ON Movies.id = Reviews.movie_id;
-- since we're finding records that match, is the same as:
ON Reviews.movie_id = Movies.id;

-- if we only want movie title and review
SELECT Movies.title, Reviews.review


/* Movies:  id  title 
   Genres:  id  genre
   Movies_Genres:  movie_id  genre_id */
SELECT *
FROM Movies
INNER JOIN Movies_Genres
ON Movies.id = Movies_Genres.movie_id
/* current selection: 
    Movies.id 
    Movies.title 
    Movies_Genres.movie_id 
    Movies_Genres.genre_id */ 
INNER JOIN Genres 
ON Movies_Genres.genre_id = Genres.id
WHERE Movies.title = "Peter Pan"
ORDER BY Movies.duration DESC;
/* result: 
    Movies.id 
    Movies.title 
    Movies_Genres.movie_id 
    Movies_Genres.genre_id 
    Genres.id
    Genres.genre */ 

/*==============================================================================

                                  Aliases

  * 
==============================================================================*/

/*------------------------------------------------------------------------------ 
                               Column Aliases
------------------------------------------------------------------------------*/

SELECT table.column AS alias
-- AS can be dropped 
SELECT table.column alias
-- multiple words or capitalization => ""
SELECT table.column "multiword alias"
SELECT table.column "Alias"

--------------------------------------------------------------------------------

SELECT Movies.title AS films, Reviews.review reviews
FROM Movies 
INNER JOIN Reviews
ON Movies.id = Reviews.movie_id;

SELECT Movies.title AS films, Reviews.review AS reviews

-- result:  films  reviews

/*------------------------------------------------------------------------------ 
                                Table Aliases
------------------------------------------------------------------------------*/

FROM table alias
INNER JOIN table alias

--------------------------------------------------------------------------------

SELECT m.title, g.name
FROM Movies m 
INNER JOIN Movies_Genres mg
ON m.id = mg.movie_id
INNER JOIN Genres g
ON mg.genre_id = g.id
WHERE m.title = "Peter Pan";

/*==============================================================================

                                 Outer Joins

==============================================================================*/


select m.title, r.id "Theatre Number"
from Movies m
-- All movies with belonging rooms 
left outer join Rooms r
-- All rooms with belonging movies
right outer join Rooms r
on m.id = r.movie_id;

/*==============================================================================

                                 Subqueries

==============================================================================*/

WHERE column IN(subquery)
  -- filters rows that have a matching id

WHERE column NOT IN(subquery)
  -- filters rows that don't have a matching id

-- Subquery - easier to read

SELECT SUM(sales)
FROM Movies
WHERE id IN
  (SELECT movie_id
  FROM Promotions
  WHERE category = 'Non-cash');

WHERE id IN
  (1,4);

-- JOIN query - better performance

SELECT SUM(m.sales)
FROM Movies m 
INNER JOIN Promotions p 
ON m.id = p.movie_id
WHERE p.category = 'Non-cash';

-- We can't have aggregate functions in WHERE clause - use subquery

SELECT id FROM Rooms WHERE seats > (SELECT avg(seats) FROM Rooms);



