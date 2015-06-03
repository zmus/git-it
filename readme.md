--------------------------------------------------------------------------------
                                  Flags
--------------------------------------------------------------------------------
Linux convention. Case sensitive.

one character:  
  * one dash  
  * -aParameter
  * may or may not be an abbreviated form of longer flag

multi-character:
  * two dashes
  * --author=Parameter

```--------------------------------------------------------------------------------
  create a repository  >  stage snapshot  >  commit snapshot
--------------------------------------------------------------------------------```

** repository ** = project folder (working directory)

** snapshot ** = state of project at a given point in time

** staging ** = creating a snapshot 

** commit ** 
  = save staged snapshot, with a descriptive message
  * "commit: SHA-1 checksum of commit contents" => unique ID for a commit  

To keep project small and efficient, you should only track source files and 
omit anything that can be generated from those files.

Committed snapshots can be seen as “safe” versions of the project. 
Git will never change them. 

--------------------------------------------------------------------------------
  LOCAL version   >>> PUSH changes >>>   REMOTE version (on GitHub server) 
                  <<< PULL changes <<< 
--------------------------------------------------------------------------------

Sometimes CONTRIBUTING.md is used besides README.md

** .gitignore ** = list of files Git should not track
                 * e.g. files with passwords

--------------------------------------------------------------------------------
  FORK a repo  >  CLONE it from GitHub  >  connect original (upstream)
--------------------------------------------------------------------------------

** fork ** = copy of repository on GitHub 
           * used for - creating your own version of a project 
                      - contributing fixes or features to the original project

Make sure you aren't cloning inside of another Git repository !

--------------------------------------------------------------------------------
  create a BRANCH  > CHECKOUT  >  work on a branch  >  CHECK-IN
--------------------------------------------------------------------------------

** branch ** = isolated copy of a project
             * when branch is ready, merge it back into 'master'

Rule: Anything in the 'master' branch must be always deployable!

Name should be descriptive (e.g. refactor-authentication).

** to checkout ** a branch
  = 
