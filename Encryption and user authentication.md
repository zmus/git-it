================================================================================
 Encryption and user authentication
================================================================================

--------------------------------------------------------------------------------
 Password encryption
--------------------------------------------------------------------------------

**Never store passwords in plain text**
  * Compromises users on your site and on other sites

**Encrypt passwords with hashing algorithm** 

One-way encryption
  * = non-reversible, even by us
  * Same inputs + same hashing algorithm = same outputs
  * Actual password gets encrypted, then stored
  * Encrypt attempted password, compare against stored

Not all hashing algorithms are suitable for passwords
  * Must be
    * one-way
    * sufficiently strong 
  * --MD5-- not considered safe anymore - 'rainbow tables'
  * SHA-1
  * SHA-2 (SHA-256, SHA-512)
  * Tiger
  * AES
  * **Blowfish**
    * very secure
    * free
    * easy to install and work with
    * slow - desired for hashing because of brute force / dictionary attacks

--------------------------------------------------------------------------------
 Salting passwords
--------------------------------------------------------------------------------

Rainbow tables
  * = Pre-computed tables of password hashes for each hashing algorithm

**Salt**
  * = Additional data added to the password before encryption
  * Knowing password requires also *knowing the salt string*
```
"Put salt on the {$password}"
"e737f991346ba46a123678ee900d0e636e68e860f"
```
  * Rainbow tables would be almost impossibly large

**Unique salt**
  * = Create salt using strings *unique to each user*
  * Knowing password requires *knowing salt and username*
```
"Put salt on the {$password} for {$username}"
"aef6603ed62eb1u30fd5305ac6e8ad50a55d111de"
```

**Random salt**
  * = Create salt using pseudo-random string
  * Knowing password requires *knowing the random string*
```
"Put salt on the {$password} at" . time() 
"b137f51092926eaeffa294af0dab49ec726e1ccef"
```
  * Rainbow tables are useless - each user's hash is almost random / unique

**Store salt in database** 
  * When using user data for salt and it could change
  * When using random salt
  * Just the salt, not the plain text password
  * Hash the salt 

**Blowfish** 
  * uses a random salt 
  * stores it in a database in front of password as a single encrypted string:
    "hashed salt" + "hashed password"

--------------------------------------------------------------------------------
 Password requirements
--------------------------------------------------------------------------------

**Require length, but do not limit it**
  * longer = stronger
  * After hashing, encrypted strings are always of the same length 

**Require non-alphanumeric characters**
  * Rainbow tables have to be much larger 

**Ask users to confirm password**
  * Reduces the chance of mistakes which might lead to security lapses

**Report password strength to users**
  * use library

**Do not record a password hint**
  * some users will simply type their password, and then it is available in
    plain text to anyone trying to break in

**Security questions are questionable**
  * answers can be googled
  * hacker might be someone who knows you

--------------------------------------------------------------------------------
 Brute-force attacks
--------------------------------------------------------------------------------

Also known as "Exhaustive key search"

rainbow tables = we know hashed password
vs.
brute force    = we go to the website and try every single possibility

Dictionary attack
  * try to use words in the dictionary first
  * idea is that words in dictionary are used before random characters

Key space ^ Key length  x  Time per attempt  =  Maximum Time required

Key space:  **allow all characters** (uppercase, lowercase, numbers, symbols)

Key length:  **allow long strings**

Time per attempt:  **use slower hashing algorithm*

**Encourage users to provide strong passwords**

Timing and throttling
  * **configure firewall, server or app to slow down the rate at which requests
    can be received**
  * 1 attempt per 2s
  * lock account for 5min after 20 attempts

Logging
  * **don't log attempted password in plain text**
  * "20 attempts from 160.54.49.32" - good

Blacklisting
  * **ban an IP address from sending more requests**
  * could be hundreds of botnets

Brute-force can't be stopped, but can be significantly slowed down.


--------------------------------------------------------------------------------
 Using SSL for login
--------------------------------------------------------------------------------

"Secure Sockets Layer"

= Provides communication Security
  1. Verifies authenticity of remote server
  2. Encrypts all data exchanged with server

Communication between client and server passes through multiple hardware and
can easily be seen:

  * client to server
```
username: son
password: goku
```
  * server to client
```
Set-Cookie: SESSION_ID=A182C3D4E5 
```

  * Hardware closest to the client 'sees' both incoming and outcoming traffic -
    e.g. open Wi-Fi at coffe shop

Using SSL 

  * prevents snooping  (snoop = zabadati nos)

  * prevents session hijacking

  * performance penalty due to encryption/decryption - worth it

  * **requires all assets to be secure**
    * JS files, CSS files and images
    * loaded from 3rd party sources - e.g. analytics JS
    * else, users may get warnings that all parts of the page are not secure!

  * **You MUST encrypt**
    * all **credit card transations**
    * all **usernames/passwords sent to the server**

  * Best practice to **use SSL for password-protected areas**
    * from log in to log out
    * even if page contains no sensitive data, you are sending cookie 
      with authentication data

  * Implementations
    * **use SSL all the time** (GitHub)
    * switch it on when needed (Amazon)
    * user-configurable (Facebok)

--------------------------------------------------------------------------------
 Protection cookies
--------------------------------------------------------------------------------

= after login, maintain authenticated access using cookies and sessions

Like a hand-stamp - we don't authenticate each time.
We take user's credentials, authenticate them, and give him a cookie.

* **Use HttpOnly cookies** - inaccessible to JS

* **Regenerate session identifier** periodically, at key points - **after login**
  * 'session fixation' attacks

* **Expire/remove old sesion files regularly**

* **Do not accept session identifiers from GET or POST variables**

* **Use SSL**

* **Use Secure cookies** - only sent over SSL 
  * Especially important if switching between HTTP and HTTPS

* Consider expiring logins after a set period of time
  * **set cookie expiration, remove session file**

--------------------------------------------------------------------------------
 Regulating acces privileges
--------------------------------------------------------------------------------

**Least privileges** principle

Be organized

**Make privileges easy to revoke** - roles change and people leave organization

**Restrict access to access privilege administration tools** - 1 or 2 people

Be careful about getting too fine-grained

**Structure content into discrete *privilege areas*** - don't let them overlap
```
Article { article content, article images, article categories, related articles }
Product { product details, product images, product catefories, related products }
Orders  { categories, tags, customers, orders }
```
  * editor = Article + product images
  * seller = customers + orders etc.

**Regulate access by user access level or category**

  * level 1, 2, 3, 4, 5 -> can do anything

  * basic, staff, junior admin, admin, senior admin

  * publisher, writer, editor, designer, graphics

  * Paying customers: free, standard, VIP

--------------------------------------------------------------------------------
 Handling forgotten passwords
--------------------------------------------------------------------------------

What proves someone's identity?

A series of security challenge questions
  * generated ahead of time with the user...
  * or based on what we know about user (account, activity...)

High security environments
  * Privileged information - e.g. ATM card number plus PIN
  * Customer service staff - remote or in person
  
Enough for most websites - email of the person is their ID
  * Send email with new password
    * if not deleted, email account has plain text copy 
    * password is reseted - someone else can lockout user from account
  * Send email with reset token

**Email a reset token**

  1. Request the username to reset

    * Always respond positively
      * e.g. "Email with password reset will be delivered shortly"
      * "User not found" gives away information to hacker

  2. Generate a unique token + store in database

    * probably some kind of hash, about 40 characters long
    * *store token generation time + set expiration time*

  3. Email a URL that includes token

    * URL grants access; allows setting password

  * Advantages
    * Account still functions up until the reset   
    * Self-serve; does not require customer service stuff, can reset anytime

--------------------------------------------------------------------------------
 Multi-factor authentication
--------------------------------------------------------------------------------

= Authentication requires two (or more) factors from different categories

3 categories - something only the user
  * knows
  * has
  * is

Bank ATM card
  * *has* card
  * *knows* PIN

Credit card purchases online 
  * *knows* card number
  * *has* physical card with CVV code

Number-generating ID device
  * *knows* password
  * *has* device present right now 
 
Something only the user *is*
  * Biometrics - fingerprint, voice, retina
  * Harder to aquire
  * Tricky and expensive to do it well
  * Often have reliability or security issues

MFA web implementation

  1. User creates an account

  2. Site logs computer being used
    * IP address, set cookie or other 

  3.a Future logins from same device approved
    * *knows* password
    * *has* computer

  3.b Future logins from new device require additional factor

    * Send email to account on file
      * with passcode to enter or URL to click
      * *knows* password
      * *has* email account

    * Send SMS message to mobile phone on file
      * with passcode to enter or require an SMS response
      * *knows* password
      * *has* phone

    * Call phone on file with recorded message
      * with passcode to enter or require voice response
      * *knows* password
      * *has* phone
      * Works with non-mobile phones without SMS

MFA implementation pitfalls
  * Most users are not familiar with it
  * Reluctance to provide additional data
  * Need to provide clear instructions
  * Reliability
  * Error handling - has to be done extremely well; consider all possibilities
  * Customer service issues - users might get frustrated

**For average websites MFA may not be worth the additional headaches.**

**For high profile or high security, it may be essential.**











