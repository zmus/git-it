
1970 relational DBMS
2009 NoSQL movement

NoSQL
  = anything outside the relational dbs category

Relational dbs
  * store records (rows) with attributes (columns) in tables
  * use a foreign key and a JOIN operation to determine relationships

Graph dbs
  * use direct links for relationships
  * "edges" allow for index free adjacency (okolina) and tremendous FLEXIBILITY
  * make data modelling natural

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

1. Download and extract 
2. Install Java JDK
3. server.sh on Linux and Mac, server.bat on Windows

Multi-Model DBMS: Graph, Document, Key/Value, and Object model 

**binary port 2424**
  * console 
  * clients/drivers that support the network binary protocol
  
**HTTP port 2480**
  * OrientDB Studio web tool 
  * clients/drivers that support the HTTP/REST protocol 
  * tools like CURL

--------------------------------------------------------------------------------
Data modelling
--------------------------------------------------------------------------------

Document & Vertex (or Node) - records in document & graph terminology
Link - direct pointer to another document
Edge - direct relationship between two vertices
Properties - Documents, Vertices and Edges

**Documents** - Fast, efficient and flexible storage
  * can contain Links to other documents
  * can contain sub-documents
  * @rid 
    * Record ID
    * #13:1 - #cluster number:record number inside that cluster

**Properties** - Provides optional schema and rules for your data
  * = unique name + data type
  * Can be indexed for speed retrieval
  * Schema-full restrictions
    * Min/Max | Mandatory | Readonly | Not Null | Unique | Regexp

**Vertices** or Nodes - Storage for a graph
  * Similar to a document
    * Can store data
    * ID, cluster, links etc.
  * Has a collection of
    * incoming edges
    * outgoing edges

**Edges** 
  * stored as a document unless lightweight
    * has properties, ID, cluster
  * from & to properties
  * **lightweight edge**
    * edge without properties 
    * similar to a link
    * does not have document record in a database

An edge is a relationship, the same as a link. Edges provide more flexibility
and are available in graph databases while a link is also available in a 
document database.

**Class** - Types of data
  * = provide rules and structure to dbs schema through inheritance, properties 
      and constraints
  * Each record must have one
  * Can inherit from another class
  * Still allows for schema-less data
  * Can have multiple clusters 
  * Has a default cluster
  * Can contain properties for a schema-full or schema-mixed model

**Cluster** - Where a group of records are stored
  * By default, one cluster per class
  * Can have multiple clusters per class
  * VERY USEFUL for
    * Logical separation to limit queries to only the most relevant data.
    * Geographic dispersed data for more localized access to increase performance.
    * Sharding large data sets over multiple disks.
    * Providing data replication options.

--------------------------------------------------------------------------------
Studio
--------------------------------------------------------------------------------




select from V
  = select all the vertices

create edge WorksAt from #13:0 to #9:0  (Gary White to ABC Ltd.)

Studio - Functions
  * You can run them in server
  * You can access them via REST API

**v** class is the base class for a Vertex while the **e** class is the base 
class for an Edge.

**O** Classes helps add functionality to the database - such as permissions
and server side functions.
You should research their purpose before you remove or modify one of them.

**_studio** class stores user specific settings like colors, past queries etc.

In the graph view, when you execute a query only the first 20 records are 
displayed.

--------------------------------------------------------------------------------
Console
--------------------------------------------------------------------------------

create database remote:localhost/ConsoleDemo user password plocal
  = create and connect to a dbs
  * plocal = storage type

disconnect
  = disconnect from server or dbs
 
connect + <mode>:<path> <user> <password>

  * connect to a server:
      <mode> = remote
      <path> = localhost = ''
      <user> = root

  * connect to a dbs as 'admin' -  default user for administration
      <mode> = remote
      <path> = /databases/<dbsName> 
      <user> = admin 

list databases
  * when connected to a server

config
  = see all configuration options of the dbs

  + get <configName>
    = get one configuration

**You can use all SQL commands**

create class <class> extends V

list classes

create property <class>.<property> <type>

info
  = all dbs info

  + class <class> 
    = super class, cluster, properties


browse class <class>
  = see records 

select from Person

load record <@RID>

--------------------------------------------------------------------------------
Backups
--------------------------------------------------------------------------------

Enterprise - allows backups through the remote connection

Community - only over local connection

connect plocal:../databases/ConsoleDemo admin admin

backup database <path><fileName>.zip
  = create compressed backup in a given location

export database <path><fileName>.export

import database <path><fileName>.export.gz

e.g. <path> = /Users/<user>/Documents/


================================================================================
SQL API
================================================================================

Case insensitive.

Orient uses superset of SQL to support graph dbs.

JavaAPI is also a native method of access.

--------------------------------------------------------------------------------
Classes
--------------------------------------------------------------------------------

CREATE CLASS <className> [EXTENDS <super-class>][CLUSTER <clusterID>]

    CREATE CLASS Lead EXTENDS V
      = extend V base class 
      * inherit qualities of a vertex

    CREATE CLASS Vehicle CLUSTER 10
      = specify default cluster

    CREATE CLASS DataItem ABSTRACT
      = create **abstract class**
      * cannot have direct records...
      * ...only records through inheritance by sub-classes
      * -> provides structure for sub-classes

ALTER CLASS <className> <attributeName> <attributeValue>

    ALTER CLASS Person NAME Individual
      = change name of the class

    ALTER CLASS Person SUPERCLASS V
      = add V as the SuperClass of Person

    ALTER CLASS Account ADDCLUSTER Europe
      = add cluster

    ALTER CLASS  Car CLUSTERSELECTION round-robin
      = specify storage strategy for the class

DROP CLASS <className>
    = delete class from the schema

TRUNCATE CLASS <className>
    = delete all the records - from all the clusters

--------------------------------------------------------------------------------
Clusters
--------------------------------------------------------------------------------

CREATE CLUSTER <clusterName> [POSITION <position> | append]

    CREATE CLUSTER AccountUSA

    CREATE CLUSTER CarsUSA POSITION 3

ALTER CLUSTER <clusterName> | <clusterID> <attributeName> <attributeValue>

    ALTER CLUSTER Europe NAME Italy

    ALTER CLUSTER Europe COMPRESSION gzip

    ALTER CLUSTER V CONFLICTSTRATEGY automerge
      = updates the V cluster to have automerge conflict strategy

DROP CLUSTER <clusterName> | <clusterId>

    DROP CLUSTER CarsUSA

    DROP CLUSTER 10

TRUNCATE CLUSTER <clusterName>
    = truncate all the records from the cluster

--------------------------------------------------------------------------------
Properties
--------------------------------------------------------------------------------

CREATE PROPERTY <class>.<property> <type> [<linkedType> | <linkedClass>]

    CREATE PROPERTY Person.name STRING

    CREATE PROPERTY Company.salesVolume FLOAT 

    CREATE PROPERTY Profile.tags EMBEDDEDLIST STRING 
      * list element of type string

ALTER PROPERTY <class>.<property> <attributeName> <attributeValute>

    ALTER PROPERTY Person.name MANDATORY true
      = make Person.name mandatory

    ALTER PROPERTY Contact.gender REGEXP [M|F]
      = make Contact.gender conform to regexp

    ALTER PROPERTY Company.tagline NAME slogan
      = Company.tagline -> Company.slogan

DROP PROPERTY <class>.<property>
    = remove the property from the class


INSERT INTO <class> (<property>) VALUES (<value1>), (<value2>)
    = create records

    INSERT INTO Person (firstName, lastName) VALUES ("Gary", "White"), ("Mick", "Jeger")

    INSERT INTO Person SET firstName = "Gary", lastName="White"

    INSERT INTO Person content {}



================================================================================
CRUD
================================================================================
--------------------------------------------------------------------------------
Creating Records
--------------------------------------------------------------------------------

INSERT INTO [class:]<class> | [cluster:]<cluster> | [index:]<index>

[(<field[,]*) VALUES (<expression>[,]*)[,]*] |
  = for multiple records

    insert into V (name, type) values ('Tim', 'artist'), ('Gary', 'fireman')

    insert into cluster:9 (name) values ('Tim')

[SET <field> = <expression> | <sub-command>[,]*] |
  = for single record

    insert into V set name = 'Tim', type = 'artist'

    insert into Diver set name = 'Bill', buddy = (select from Diver where name = 'Max')

    insert into Husband set name = 'Wayne', wife = (insert into Diver name = 'Jill')

[CONTENT {<JSON>}] |
  = for JSON objects

    insert into V content {"name": "Tim", "type": "artist"}

[RETURN <expression>]

[FROM <query>]

    insert into cluster:ClientFR from (select from Client where country = 'Canada')

--------------------------------------------------------------------------------
Queries
--------------------------------------------------------------------------------

SELECT [<Projections>] [FROM <Target> [LET <Assignment>*]]

    select name, age from Account
      = uses a projection to return 'name' and 'age' property of all records 
        from the 'Account' class

    select from [#10:3, #10:4, #10:5]
      = selects the 3 records

    select name.toUppercase(), adress.city.country.name from Profile
      = returns all records from the 'Profile' with 
        * 'name' converted to uppercase
        * links between adress.city.country.name resolved inline

    select count(*) from Person
      = returns number of records in Person class

    select name, eval('highwayMPG - cityMPG') AS variance FROM Model
      = output name and difference between two properties under 'variance'

    select distinct(firstName) as name from Person order by name asc
      = all names that are distinct, ordered

[WHERE <Condition> *]

    select * from Person where name LIKE 'Luk%'
    select * from Person where name.left(3) = 'Luk'
      = all records from 'Person' class that have a 'name' starting with 'Luk'

[GROUP BY <Field> *]

[ORDER BY <Fields> * [ASC | DESC] *]

    select from Profile order by @rid desc

[SKIP <SkipRecords>]

[LIMIT <MaxRecords>]

[FETCHPLAN <FetchPlan>]

[TIMEOUT <Timeout> [<STRATEGY>]

[LOCK default | record]

[PARALLEL]


SELECT FROM Profile
LET $city = adress.city
WHERE $city.name like '%Saint%' and
    ( $city.country.name = 'Italy' or $city.country.name = 'France' ) 

    = select profiles that have an adress where the city contains 'Saint' 
      and whose country that is either Italy or France

--------------------------------------------------------------------------------
Updating Records
--------------------------------------------------------------------------------

UPDATE <class> | cluster:<cluster> | <recordID>

[SET | INCREMENT | ADD | REMOVE | PUT <field-name> = <field-value>[,]*] | 
 CONTENT | MERGE <JSON>]

    update Profile remove name
      = removes 'name' from all profiles

    update Account add addresses = #12:0
      = adds a value into a collection property 'addresses' in all account rec.

    update #15:332 set address = {"street": "Rose Ave.", "city": {"name": "NY"}}
      = puts a JSON into the 'address' property with the @RID #15:332

[UPSERT]
  = update or insert if nonexistant

    update Person set firstName = 'Dave' upsert where status = 'active'
      = updates all active 'Person' records to have a firstName = 'Dave'
      = creates a new record if such a record does not exist

[RETURN <returning> [<returning-expression>]]
     * before = before update
     * after = after update

[WHERE <conditions>]

    update Profile set name = 'Dave' where name is NULL
      = updates all profiles with the name property equal to NULL to have a 
        name of Dave

[LOCK default | record]

    update Counter increment views = 1 where page='/downloads/' lock record
      = updates the 'Counter' records from '/downloads/' page
        * increments the 'views' property by 1
        * locks the record

[LIMIT <max-records>] [TIMEOUT <timeout>]

    update Profile set job = 'Labourer' where job is NULL limit 20
      = ...where the current job is NULL and sets a limit of 20 records

--------------------------------------------------------------------------------
Deleting Records
--------------------------------------------------------------------------------

DELETE FROM <Classs> | cluster:<cluster> | index:<index> 

[LOCK <default | record>]

[WHERE <Condition>*]

    delete from Profile where surname.toLowerCase() = 'unknown'
      = delete all records from the 'Profile' class, 
        where the surname is equal to the lowercase of a given string

    delete from Leads where age > 120

    delete from cluster:Archive
      = delete all records from the 'Archive' cluster

    delete from #13:45 return before
      = deletes the record #13:45 
        and returns the record in its state prior to deletion

[LIMIT <MaxRecords>]

[TIMEOUT <timeout>]


================================================================================
Graph SQL - traversals
================================================================================

Include some extra checks and balances related to a graph database.
Such as a need for vertex to belong to a class extending V.

--------------------------------------------------------------------------------
Vertex C _ _ D
--------------------------------------------------------------------------------

CREATE VERTEX <class> | CLUSTER <cluster> 

[SET <field> = <expression>[,]*]

    CREATE VERTEX Person SET firstName = "Bob", lastName = "Brown"

    CREATE VERTEX Person CLUSTER Italy SET firstName = "Bob", lastName = "Brown"

    CREATE VERTEX Employee CONTENT { "name":  "Tim", "surname": "Wayne" }

---

DELETE VERTEX <class> | <rid>

    DELETE VERTEX #24:865

[WHERE <conditions>]

    DELETE VERTEX Automobile WHERE currentModel = false
      = where the currentModel property is false

    DELETE VERTEX Person WHERE in.@Class = "Expired"
      = all Person vertices that have "in" edges with a class of "Expired"

[LIMIT <MaxRecords>]

--------------------------------------------------------------------------------
Edge C _ _ D
--------------------------------------------------------------------------------

CREATE EDGE <class> [CLUSTER <cluster>] 
FROM <rid> | (<query>) | [<rid>]*
TO <rid> | (<query>) | [<rid>]*

    CREATE EDGE FROM #10:3 TO #11:4
      = lightweight 

    CREATE EDGE WorksAt FROM #10:3 TO #11:4
      = lightweight of type 'WorksAt'

    CREATE EDGE WorksAt CLUSTER  Teamsters FROM #10:3 TO #11:4
      = stores it in a 'Teamsters' cluster

    CREATE EDGE Underage (SELECT FROM Person WHERE age < 18) TO #11:4
      = from all underage people to a movie #11:4

[SET <field> = <expression>[,]*] | CONTENT {<JSON>}

    CREATE EDGE FROM #20:1 TO #21:3 CONTENT {value: 1200}
      = with a property value

[RETRY <retry> [WAIT <pauseBetweenRetriesInMs]]

---

DELETE EDGE <rid> | FROM <rid> | TO <rid> | [<class>]

[WHERE <conditions>]

    DELETE EDGE Owns WHERE date < "2015-04"

    DELETE EDGE Owns WHERE date < "2015-04" and in.boughtFor < 350
      = incoming edge with a property .boughtFor < 350

    DELETE EDGE FROM #11:1 TO #11:2 WHERE date <= "2015-04-06"

    DELETE EDGE FROM #11:1 TO #11:2 WHERE @class = "comment" AND status = "SPAM"

[LIMIT <MaxRecords>]

--------------------------------------------------------------------------------
Traversals
--------------------------------------------------------------------------------

* For flexible graph queries

* Suitable when "depth" is uknown

* Various strategies for traversal - require a course of their own

---

TRAVERSE * FROM #10:2
  = finds all vertices using the base vertex #10:2 

TRAVERSE * FROM #14:5 WHILE $depth <= 2

SELECT FROM Person WHERE any() traverse(0,3) (firstName = "Carl")
  = has vertex within 3 levels of depth with the given property value

SELECT out('Bought').out('Bought') FROM #25:6
  = buyer of buyer of #25:6
  * better speed without traversal - we know the depth target is 2 ahead of time

SELECT $path FROM ( TRAVERSE out FROM Make WHILE $depth <= 3 )
  = vertices traversed in order of traversal

TRAVERSE Friends FROM #10:1 WHILE $depth <= 3 STRATEGY BREADTH_FIRST

SELECT FROM ( TRAVERSE Friends from #10:1 WHILE $depth <= 3 ) WHERE $depth >= 1
  = friends of #10:1 between the depths of 1 and 3

SELECT out("Owns") FROM (
TRAVERSE out("Bought", "Sold")[buyerRating > 6 and sellerRating > 6].in("Bought", "Sold") 
FROM #1:1 
WHILE $depth < 3
) 
WHERE out("IsModel")[0] = #12:0

= traverses through all transactions attached to #1:1, 
  including buyers and sellers,
  up to 3 levels of depth, 
  that also has buyer and seller rating > 6

--------------------------------------------------------------------------------
Graph Functions
--------------------------------------------------------------------------------

Mix into existing SQL nicely.

out
in
both
outE
inE
bothE
outV
inV
traversedElement
traversedVertex
traversedEdge
shortestPath
dijkstra

SELECT in('isModel').color FROM #14:3
  = colors of cars that are model #14:3 

SELECT both('Friend', 'Brother') from Person WHERE lastName = 'Davis'
  = vertices connected through 'Friend' or 'Brother' edges in either direction
    to the Person vertices with the lastName = 'Davis'

SELECT outV() FROM Bought WHERE purchasePrice < 1000
  = outgoing vertices where the 'Bought' edge has the .purchasePrice < 1000

SELECT FROM Poi WHERE distance(x, y, 52.20472, 0.14056) <= 30
  = 'Poi' vertices with the distance <= 30, from the hardcoded coordinates

SELECT shortestPath(#13:30, #27:600, 'BOTH')
  = returns the series of steps that make up the shortest path between records

SELECT dijkstra($current, #13:30, 'weight') FROM V
  = the least weighted path between each vertex in V and #13:30

SELECT FROM (SELECT in('IsModel') FROM #12:12) 
WHERE avg(in('Owns').out('Sold').buyerRating) > 6
  = cars, model #12:12, that have sellers with good ratings from other car buyers

--------------------------------------------------------------------------------
Transactions
--------------------------------------------------------------------------------

* Critical in production grade operational database

* Provide reliable units of work
  * Execute multiple database commands... 
  * commit them as one unit of work...
  * and be guaranteed all operations happen successfuly

* Provide isolation for concurrent users

* Key component in ACID compliant dbs 

* OrientDB is an ACID compliant
  * Atomic
  * Consistent
  * Isolated
  * Durable

* MVCC - "Multi Version concurrency control"
  * system that manages concurrent save routines

Begin transaction: 
$ begin

Create, update, delete:
$ insert into Person set name = "Bob"

Commit transaction:
$ commit

Rollback transaction:
$ rollback

--------------------------------------------------------------------------------
Cluster Selection
--------------------------------------------------------------------------------

default
  * returns Class's default cluster

round-robin    DEFAULT
  * returns next cluster 
  * goes in circle 

balanced
  * returns smallest cluster
  * calculates sizes every 5s

local
  * returns cluster that is the master on current node...
  * ...when running in distributed mode

================================================================================
Server side functions 
================================================================================

* are persistent 
  * in OrientDB, all funcs are stored in the OFunction class as a document

* Written in SQL or JavaScript

* Can be executed by SQL, Java, REST & Studio

* Can call each other and be recursive

* Support transactions

* Have access to an HTTP request object...

* ...and are able to return response via HTTP

* Build Secure Data Services

```JavaScript
// createPeople()

// reference to a database
var db = orient.getGraph();

for (var i = 0; i < howMany; i++) {
  var thePerson = createPerson();
  db.command(
    'sql', 
    'insert into Person (firstName, lastName, gender)' +
    'values ("' + thePerson.firstName + '", "' + thePerson.lastName + '", "' + thePerson.gender + '")'
  );
}

return "success";
``` 
```JavaScript
// createPerson()

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var femaleFirstNames = ['Barb', 'Kelly', 'Wendy', 'Sally'];
var maleFirstNames = ['Bob', 'Jim', 'James', 'Kevin'];
var lastNames = ['Smith', 'Wilson', 'Davis', 'Hall'];

var gender = (1 === getRandomInt(0,1)) ? 'Male' : 'Female';
var lastName = lastNames[getRandomInt(0, lastNames.length - 1)];  
var firstname; 
                         
if (gender === 'Male') {
  firstName = maleFirstNames[getRandomInt(0, maleFirstNames.length - 1)];
} else {
  firstName = femaleFirstNames[getRandomInt(0, femaleFirstNames.length - 1)];
}

var personObj = {
  firstName: firstName,
  lastName: lastName,
  fullName: firstName + ' ' + lastName,
  gender: gender
};

return personObj;
``` 

================================================================================
REST
================================================================================

localhost:2480/connect/VehicleHistoryGraph
  * connect to dbs
  * don't forget to set Authorization header

localhost:2480/function/VehicleHistoryGraph/createPeople/100
  * call function createPeople(100)

================================================================================
[Users Permissions and Authentication](http://www.orientechnologies.com/docs/last/orientdb.wiki/Security.html)
================================================================================


