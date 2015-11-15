
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
Instalation
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

================================================================================
Data modelling
================================================================================

Document & Vertex (or Node) - records in document & graph terminology
Link - direct pointer to another document
Edge - direct relationship between two vertices
Properties - Documents, Vertices and Edges

**Documents** - Fast, efficient and flexible storage
  * can contain Links to other documents
  * can contain sub-documents
  * @rid 
    * Record ID
    * #13:1 - #cluster number:record number 

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
  * stored as a document, unless lightweight
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
  * returns cluster that is master on the current node...
  * ...when running in distributed mode

================================================================================
[Studio](http://www.orientechnologies.com/docs/last/orientdb-studio.wiki/Home-page.html)
================================================================================

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

================================================================================
[Transactions](http://www.orientechnologies.com/docs/last/orientdb.wiki/Transactions.html)
================================================================================

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

================================================================================
[Server side functions](http://www.orientechnologies.com/docs/last/orientdb.wiki/Functions.html) 
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
[Users Permissions and Authentication](http://www.orientechnologies.com/docs/last/orientdb.wiki/Security.html)
================================================================================

Users
  * 'OUser' class 
  * can belong to many roles
  * have a status of 
    * 'Active' = can log into the system
    * 'Suspended'
  * 3 default users: admin, reader, writer

Roles
  * 'ORoles' class
  * can inherit from other roles
  * Each role is assigned
    * rules
    * users
    * mode: 'deny all but' | 'allow all but'

Rules
  * permissions to resources
  * classes, clusters, functions, schema etc. almost anything

Built in record level security
  * important in multi tenant (cloud) apps  ( tenant = stanar )
    * a single instance of a software runs on a server and serves multiple 
      tenants - groups of users with same privileges 
    * e.g. only owner of the blog can write
  * Simply have your class extend the 'ORestricted'
    * This provides 4 link set properties
      * _allow  _allowDelete  _allowRead  _allowUpdate
      * Each holds a list of all users and roles for each individual record

================================================================================
Distributed Deployment
================================================================================

[Distributed Architecture](http://www.orientechnologies.com/docs/last/orientdb.wiki/Distributed-Architecture.html)
[Setup a Distributed Database](http://www.orientechnologies.com/docs/last/orientdb.wiki/Tutorial-Setup-a-distributed-database.html)

Scale Requests - Add bandwith by deploying new nodes

Replication - Data is highly available and secure in multiple,
automatically backed up replications

Sharding - Big Data scale by using more than one disk

---
1. Create 3 clients on LAN
2. On each, download OrientDB and setup root password
3. On each, ./dserver.bin
4. All 3 nodes discover each other automatically through the Hazelcast system
   and start synchronizing databases (you can copy them manually to save network traffic)
---

/config/default-distributed-db-config.json
  * created at first run and updated when cluster changes

/config/hazelcast.xml
  * multicast options such as 'group name' and 'cluster password'

================================================================================
[ETL module](http://www.orientechnologies.com/docs/last/orientdb-etl.wiki/Introduction.html)
================================================================================

"Extract, transform, load"

For importing data from in other formats.

