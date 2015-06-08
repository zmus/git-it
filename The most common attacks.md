================================================================================
 The most common attacks
================================================================================

The Big Three: XSS, CSRF, SQL injection. 
Manage them first!

--------------------------------------------------------------------------------
 Cross-site scripting "XSS"
--------------------------------------------------------------------------------

= Inject JS into a web page 

Used to steal cookies, including session data.

"Cross-site" because scripting is done via another website.

Successful because browser trusts the JS - allowed to access cookie data.

```ruby
GET /register.php?email=kevin@gmail.com

HTML output:
Email: <%= email %> 

Email: kevin@gmail.com  
```
Attack - email adress is a script:
```ruby
GET /register.php?email=<script>alert("Gotcha!");</script>

Email: <%= email %>

Email: <script>alert("Gotcha!");</script>
```

**Sanitize database data.** 
Being stored doesn't mean it can be trusted.

```ruby
<script>
  var user_list = <%= @users.to_json %>;
</script>

// Prematurely truncate JSON, insert script and comment out everyting after...
// database data:
email = "fake@email.com\"; alert('Gotcha!'); //"
```

**Sanitize any dynamic text that gets output to browser** - HTML, JS, JSON, XML, etc.

Database, cookie, session data, **especially data from URLs or forms**.

Sometimes HTML must be allowed (CMS)
  * Whitelist the allowed HTML tags
  * Sanitize everything else

--------------------------------------------------------------------------------
 Cross-site request forgery "CSRF"
--------------------------------------------------------------------------------

= Trick users into making a request to your server

Used for
  * fraudulent clicks - e.g. hacker is payed based on page views
  * taking advantage of a user's logged in state

case 1: Setting up online poll

"Who is the smartest hacker?"

`https://poll.com/vote?hacker=5674` = vote for Pedro

Pedro includes that link in a comment to a blog post:
`<img src="https://poll.com/vote?hacker=5674">`

Browser sends request to URL. Since users are logged in, they vote for Pedro.

case 2: 

You log-in to your online banking account.

You close browser window, but don't log out. Session with bank is still open.

You open a blog with code in comments inserted by hacker:
`<img src="https://bank.com/transfer?amount=1000&to=987654321">`

**GET should be idempotent**    
  * = calling it repeatedly makes no additional changes 
  * 'play' and 'stop' '- idempotent
  * 'pause' - toggles state - not idempotent

**Only use POST for making changes**
  * '<img>' are always GET
  * it is possible to issue POST without web form, but very hard for someone else

**Create smart web forms** - custom forms
  * = ensure that request comes from forms, generated recently by our server for a 
      particular user 

  1. *Store a "form token" in user's session* - hash
  2. *Add a hidden field to forms, with form token as value*
       * When form is delivered, it has the same value as the user's session
  3. *Compare the two* - session form token vs. submitted form token

  * if form is copied to another client, it won't work
  **Store the *token generation time* in user's session**
    * e.g. make it expire after 1day

--------------------------------------------------------------------------------
 SQL injection
--------------------------------------------------------------------------------
Dynamically generated SQL:
```sql
SELECT * FROM users
WHERE username = '${username}' AND password = '${password}';

username = "jsmith
password = "secret"

SELECT * FROM  users
WHERE username = 'jsmith' AND password = 'secret';
```
Attack:
```sql
SELECT * FROM users
WHERE username = '${username}' AND password = '${password}';

username = "jsmith' OR 1 = 1; --"
password = "blank"

SELECT * FROM  users
WHERE username = 'jsmith' OR 1 = 1; --' AND password = 'blank';
```

**Give limited privileges to application's database user**
  * allow: read and write
  * deny:  create and drop tables, truncate tables, grant access privileges   

**Sanitize input**
  * Escape for SQL - most programming languages have library
  * `\'` instead of `'`

OR better alternative:

**Prepared Statements**
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

Simple but can be dangerous.

Used for
  * revealing private information
  * performing restricted actions

 

