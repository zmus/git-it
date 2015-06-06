================================================================================
 General security principles
================================================================================

--------------------------------------------------------------------------------
 Least privilege
--------------------------------------------------------------------------------

Every program and every privileged user of the system should operate using 
*the least amount of privilege necessary* to complete the job.

Benefits:
  * Code stability
      * Controlled data access
      * Easier to test

  * System security
      * Vulnerabilities are limited and localized

--------------------------------------------------------------------------------
 Simple is more secure
--------------------------------------------------------------------------------

* Use clearly named functions and variables

* Write code comments about security

* Break up long sections of code into small functions

* Don't repeat yourself
    * if code is broken, you have to fix it at multiple places

* Don't leave old legacy code lying around - might provide backdoor

* Built-in functions are often better than your own versions

* Disable or remove unused features when possible

--------------------------------------------------------------------------------
 Never trust users
--------------------------------------------------------------------------------

* Be paranoid

* Don't trust admin users completely - eg. stolen identity

* Use caution with contractors - make it easy to revoke their access

* Even offline - phone, email, printing

--------------------------------------------------------------------------------
 Expect the unexpected
--------------------------------------------------------------------------------

* "What are all the thing a user coudld try on this page?"

* Consider edge cases

--------------------------------------------------------------------------------
 Defense in depth 
--------------------------------------------------------------------------------

Layered defense slowing the advance of an attacker 
=> Attack loses momentum ('attacking the hill')

* **People**
    * writing security policy
    * following best practices
    * signing responsibilities

* **Technology**
    * Firewall
    * Intrusion detection
    * Server hardware and software
    * Encryption to protect data wallets and transit
    * Access controls: server, app, database

 * **Operations**
    * Periodic security reviews
    * Data handling procedures
    * Monitoring responsibilities
    * How do you respond to threats
        * ex. who gets called at 3am when something happens to the server?
        * what are procedures and options available to them based on attack?

--------------------------------------------------------------------------------
 Security through obsurity
--------------------------------------------------------------------------------

Similarly to least privilege, expose only necessary *information*.

**Limit exposed information**

  * URLs include file ending that gives away language or technology?
    Use **URL rewrites** (www.site.com/index.php => www.site.com)

  * Does HTTP response header include software version information?
    Turn it off.

**Limit feedback**

  * If a username and password don't match:
      * Don't say which one failed or if the username exists in the database
      * Just simply say it didn't work 

  * Don't try to confuse hackers with strange table names ('simple is more secure')

--------------------------------------------------------------------------------
 Blacklisting and whitelisting
--------------------------------------------------------------------------------

**Whitelisting** 
    = reference list for what is permitted
    * Restricted by default - more secure than blacklisting!
    * Users who can access, actions they can take, types of data that are allowed...

--------------------------------------------------------------------------------
 Map exposure points and data passageways
--------------------------------------------------------------------------------
    
**Income exposure points**
    * URLs
    * Forms
    * receiving Cookies / Sessions
    * Database reads
    * Your public APIs (public can interact with app)

**Outgoing exposure points**
    * HTML
    * JavaScript / JSON / XML / RSS
    * sending Cookies / Sessions
    * Database writes
    * Third-party APIs (eg. google maps)

**Mapping data passageways**
    * What path does data take?
    * Sketch 
    * Enumerated list of all access points
    * Software for graphical representations you can evolve over time

