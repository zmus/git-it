================================================================================
 Filtering input / Controlling output
================================================================================

* [Regulating requests](#-regulating-requests)
* [Validating input](#-validating-input)
* [Sanitizing data](#-sanitizing-data)
* [Labeling variables](#-labeling-variables)
* [Keeping code private](#-keeping-code-private)
* [Keeping credentials private](#-keeping-credentials-private)
* [Keeping error messages vague](#-keeping-error-messages-vague)
* [Smart logging](#-smart-logging)

--------------------------------------------------------------------------------
 Regulating requests
--------------------------------------------------------------------------------

**Accept *only* expected HTTP request methods** and ignore all others.

**Regulate accepted request/response formats:**
  * What type of data are we willing to accept into our application?
  * request **"Content-Type"** = format of sent data
  * request **"Accept"** = expected format for returned data
  * most common: HTML, JSON, XML, Text
  * any MIME type (RSS, PDF, image, audio, video...)

--------------------------------------------------------------------------------
 Validating input
--------------------------------------------------------------------------------

**Regulate all the possible fields - only allow expected data**
  * form: username, password
  * hacker: birthdate, email... => ignore those or reject the request

Consider application and database requirements.

**Set default values**

Common validations:
  * Presence / Length 
      * adress field not blank
      * str.length < 256
      * name.length > 0 && name.length < 50

  * Type
      * if expecting integer, do not accept strings
      * pic upload: data + PNG

  * Format
      * email adress should look like an email adress
      * usually evaluated with RegEx (some pitfalls)

  * Within a set of values
      * positive number between 1 and 10 
      * correspond to a known item in a database

  * Uniqueness
      * unique user names
      * unique blog post titles

--------------------------------------------------------------------------------
 Sanitizing data
--------------------------------------------------------------------------------

Is the data potentially dangerous?

**Always use type casting** `1 == Number("1")` **instead of type juggling** `1 == "1"`

**Sanitize SQL, HTML, JavaScript, JSON, XML, etc.** you are receiving
  * **Encoding Characters**
      * Replace powerful characters with harmless equivalents
      * HTML: < with  `&lt;` and > with `&gt;`

  * **Escaping Characters**
      * Add them before powerful characters
      * SQL: "WHERE name='fake\' AND 1=1--'";

**Do not write custom sanitization methods**
  * Use well-tested, language-specific functions
  * Very hard to get them right and account for all cases

**Do not remove or correct invalid data** - it becomes a game of cat-and-mouse.
**Sanitize it instead.**
```JavaScript
// Hacker tries:
input = '<script>alert("Gotcha!");</script>'
 
// You remove <script> and </script> tags:
input = 'alert("Gotcha!")';

// Hacker tries:
input = '<scr<script>ipt>alert("Gotcha!");</scr<script>ipt>'

// You remove <script> and </script> tags:
input = '<script>alert("Gotcha!");</script>'
```

Consider where data will go later (JSON, XML...) and **sanitize for each filetype**.

--------------------------------------------------------------------------------
 Labeling variables
--------------------------------------------------------------------------------

**Use var names to identify condition of data**  
  * dirty, raw, tainted, unsafe
  * clean, filtered, sanitized, safe

For example email
  * not sanitized:  var rawEmail 
  * sanitized:      var safeEmail = sanitize(rawEmail);     

--------------------------------------------------------------------------------
 Keeping code private
--------------------------------------------------------------------------------

**Public directory**
  * Accessible by the server
  * Point of entry to your web site or app
  * Be smart; eg. call functions but define them in libraries dir

**Libraries directory**
  * Not accessible by the server
  * Accessible by code via the file system

Web server configuration
  * **Set document root** - public dir
  * **Allow / deny access** - directory, file, filetype, IP, deny search engines...
  * **.htaccess** file
      * = security restrictions for containing dir 
      * Authorization, authentication, blocking
      * on Apache, but popular
  * **.htpassword** 
      * = usernames and passwords to gain access

--------------------------------------------------------------------------------
 Keeping credentials private
--------------------------------------------------------------------------------

Credentials used in code:
  * connect to a database
  * connect to a credit card payment processor
  * pull updates from a code repository

**Plain text credentials are dangerous**
  * **Keep them separate from code** - in a separate file
  * **Keep them out of version control systems**
  * **Have as few copies as necessary**
      * If production code is connecting to a production dbs, only server should 
        have credentials
      * Developers should all have separate dba with separate credentials

**Do not reuse passwords**
  * Unique for every computer, environment, database
  * 'Least privilege' principle - password for 20 things is less secure than for 1

**Prefer hashed (encrytped) passwords** whenever possible

*Public-key cryptography*
  * Public key 
      * can be installed anywhere - any server, GitHub...

  * Private key
    * usually encrypted and requires password to access it
    * logging into a server from a local machine via SSH:
      1. client: request to connect 
      2. server: challenge message encrypted with public key - but can only 
                 be decrypted with private key
      3. client: challenge message decrypted with private key

  * *Password and private key are never sent over the network* - just a message

  * SSH agent forwarding
    1. C connects to a server A
    2. if A needs to connect to a server B (database, GitHub...), send 
       their challenge message to C
    3. C sends an answer to A (solved with locally stored private key)

--------------------------------------------------------------------------------
 Keeping error messages vague
--------------------------------------------------------------------------------

'Security through obscurity' principle.

Leave hackers in the dark with minimal feedback:
  * **Turn off detailed error reporting for production server**
  * **Return generic 404 "wasn't found" and 500 "server error" error pages**
  * **Store details in a log file or send them via email**
  * **Configure web server to use same error pages as application**

--------------------------------------------------------------------------------
 Smart logging
--------------------------------------------------------------------------------

Errors
  * that occur in the app, to fix them
Sensitive actions
  * logging in, exporting files...
Possible attacks 
  * anything that looks suspicious

Data worth logging:
  * Date and time
  * Source of the action - user and/or IP
  * Action - what were they trying to do
  * Target - what were they trying to affect
  * Cookie/session
  * URL and all parameters in raw form - hacker input
  * Backtrace - all the code they touched on their way (code line numbers)

Keep an Activity History or Audit Trail
  * **Add database table called "logs"**
  * Write a function to add entries with a timestamp
  * Call the function whenever an admin makes a change

Review logs routinely

**Don't log sensitive data**
  * Especially if app has built-in logging
  * Beware POST parameters and database queries
  * Filter out passwords, keys, and tokens 

**Keep old content**
  * Versioning
    * if an articles gets hacked, you still have the old version you can restore
  * Paranoid delete
    * don't actually delete records from the dbs - put boolean flags to indicate  
      deleted state

