================================================================================
Other areas of concern
================================================================================

* [Credit card payments](#credit-card-payments)
* [Regular expression flaws](#regular-expression-flaws)
* [Conversions and transformations](#conversions-and-transformations)
* [Buffer overflows](#buffer-overflows)
* [Source code managers](#source-code-managers)
* [Database security](#database-security)
* [Server security](#server-security)

--------------------------------------------------------------------------------
Credit card payments
--------------------------------------------------------------------------------

Many precautions are required by the credit card company and payment processors.

**PCI compliance**
  * Payment Card Industry Security Standards Council
  * https://www.pcisecuritystandards.org
  * Data security standards set by credit card companies
  * If you are not compliant
    * they don't have to ensure your losses
    * they could stop letting you accept credit card payments
  * Different requirement levels depending on size of your business
    * value and volume of sales
    * some levels require security audits
      * they remotely probe your server
      * security expert in person 
  * Total security of transaction
    * **make sure your ISP and webhost are PCI compliant**

Some best practices
  * **Transmit all payment information over SSL**
    * also verifies authenticity of receiver
  * **NEVER store full credit card number!**
  * **Never store security code (CVV)**  
  * **Store card brand and last four digits of card number**
    * "You paid with Visa card ending in 9876"

**Credit card vaults**
  1. Processor stores card information you've sent 
  2. Sends back a reference token
  3. Refer to information by token whenever you need it  

  * If token gets stolen, it's useless to hacker
  * *High security* - managed by security specialists
  * Makes PCI compliance easier
  * Some processors even allow direct communication with vault, without 
    your server
  * great for *recurring payments* 

--------------------------------------------------------------------------------
Regular expression flaws
--------------------------------------------------------------------------------

**Treat all regular expressions as weak points**

They use simple simbols to represent complex ideas, but there are nuances that 
aren't obvious by just looking at them.

The more complicated it is, the weaker it is.

It doesn't have to be complicated to be flawed.

case 1: Check if string contains only letters and numbers

  * `/[a-zA-z0-9]*/`

  * `*` zero or more characters `+` one or more characters

  * RegEx accidentaly includes empty strings.

case 2: Check if date string is formatted correctly

  * `/^\d{4}-\d{2}-\d{2}$/`

  * `d` digit

  * `^` start of line `$` end of line

  * `\A` start of string `\Z` end of string

  * If we had correctly formatted date followed by line return LR, and then more
    data, RegEx would allow it.

case 3: Pull first and last name from comma delimited data

  * `/First: (.+), Last: (.+),/`

  * "First: Tom, Last: Smith, City: Denver,"

  * `.+` is greedy  =>  chooses last comma  => "Tom", "Smith, City: Denver" 

  * `.?` not greedy =>  chooses first comma => "Tom", "Smith"

--------------------------------------------------------------------------------
Conversions and transformations
--------------------------------------------------------------------------------

Be careful when 
  * **converting data between formats**
    * JSON > array
    * comma delimited files
  * **transforming data** 
    * tabs > spaces
    * html character entities > html equvalents
    * changing character encoding

Subtle differences - reserved, meta, and escape characters might be different

**Re-sanitize**

--------------------------------------------------------------------------------
Buffer overflows
--------------------------------------------------------------------------------

"Stack overflows"

= When more data is written to a block of memory (buffer) than it can hold,
  and overwrites block used for something else

Can be use to
  * crash systems
  * change a program's behavior
  * execute system-level commands

Biggest problem for low-level languages - C, C++, Objective-C ...

High level languages are safer, but sometimes use low level libraries.

* Allocate memory accurately
* Use safe string functions
* Validate data

--------------------------------------------------------------------------------
Source code managers
--------------------------------------------------------------------------------

"SCM"

Part of the bigger, Version Control Systems (VCS)

Git, Subversion, Mercurial, TFS, SourceSafe, CVS, Bazaar...

= Manages code changes in a secure data repository

* Manage contributor access privileges

* **Do not commit databases, credentials, tokens, hashes**
    * most SCM have a way to "ignore" them

* **Removing data later is difficult**
    * You can see it in old versions
    * Many SCM are designed to prevent data loss/removal
    * If you change commit by force, its ID and ID of every 
      successor commit are changed = BIG MESS

--------------------------------------------------------------------------------
Database security
--------------------------------------------------------------------------------

**Set a strong root password**

**Connect using user besides root** - which is disposable
  * use root only for administering

**Allow access only from**
  * localhost 127.0.0.1  - if database is local
  * IP address of an app - if database is remote

Backup
  * **Backup regularly - at least daily**
  * Protect backups physically - occasionally move to a remote, secure location
  * Some ISPs automatically back up entire server
 
--------------------------------------------------------------------------------
Server security
--------------------------------------------------------------------------------

**Secure or disable root user login**

Superuser - has power of a root, but it's not root itself

**SSH keys for login**
  * instead of (or in addition to) usernames and passwords

**Customize connection port numbers**
  * 80 HTTP - don't want to change this
  * 20 FTP
  * 22 SSH, SFTP - e.g. change to 1204, so hacker needs to guess it
  * most ports < 1000 are reserved

**Keep software up to date** - security fixes provide map for hackers

**Disable/remove anything not needed** - edit configuration file