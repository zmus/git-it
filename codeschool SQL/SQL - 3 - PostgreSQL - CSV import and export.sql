
\d table
  = schema

\dt
  = tables

/*------------------------------------------------------------------------------
  Import from CSV
------------------------------------------------------------------------------*/

CREATE TABLE groceries (item varchar(50), date date, price float);

/*--------------------
apple, 2015-8-22, 3.55
carrot, 2015-4-6, 1.99
--------------------*/
COPY table FROM 'C:\filename.csv' DELIMITER ',' CSV;

-- permission denied => add Everyone with full permissions in file properties

/*--------------------
item, date, price
apple, 2015-8-22, 3.55
carrot, 2015-4-6, 1.99
--------------------*/
COPY table FROM 'C:\filename.csv' HEADER DELIMITER ',' CSV;

-- CSV in Excel -> headers are column titles

/*------------------------------------------------------------------------------
  Export to CSV
------------------------------------------------------------------------------*/

COPY (query) TO 'location' HEADER DELIMITER ',' CSV;

COPY
(
  SELECT DISTINCT(item) 
  FROM groceries
  ORDER BY item
) 
TO 'C:\filename.csv' HEADER DELIMITER ',' CSV;

