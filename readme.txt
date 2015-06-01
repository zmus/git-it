--------------------------------------------------------------------------------
  create a repository  >  stage snapshot  >  commit snapshot
--------------------------------------------------------------------------------

snapshot = state of project at a given point in time

staging = creating a snapshot 

commit = save staged snapshot, with a descriptive message
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

.gitignore = list of files Git should not track
           * e.g. files with passwords

--------------------------------------------------------------------------------
  FORK a repo  >  CLONE it from GitHub  >  connect original (upstream)
--------------------------------------------------------------------------------

Make sure you aren't cloning inside of another Git repository !

--------------------------------------------------------------------------------
                                 Configure Git
--------------------------------------------------------------------------------

  git --version

  git config user.name "<fullName>"
  git config user.email <email>
    * used in commits (everyone will see it)
    + --global = for all repositories
  
--------------------------------------------------------------------------------
                                  Repository
--------------------------------------------------------------------------------

  = project folder (working directory)
 
  git init
    = make folder a repository
  
--------------------------------------------------------------------------------
                                    Commit
--------------------------------------------------------------------------------

git status
  = view  modified / staged / untracked  files 

git diff
  = view changes since last commit

git log  
  = view commit history
  + --oneline  = condense output to a single line
  + <filename> = only for this file

git add <filenames>
  = stage files for the next commit
  * `.` stage all files

git commit  -m "<message>"
  = commit staged snapshot

--------------------------------------------------------------------------------
                                    GitHub
--------------------------------------------------------------------------------

git config --global user.username <userName>
  = GitHub username
  * case sensitive

--------------------------------------------------------------------------------
                                    Remote 
--------------------------------------------------------------------------------

git remote add <remoteName> <URL>
  = add remote connections

git remote set-url <remoteName> <URL>
  = set URL to an existing remote

git push <remoteName> <branchName>
  = push changes

git pull <remoteName> <branchName>
  = pull in changes

git remote --v
  = view remote connections

conventions:
  <remote>
    'origin'   = main
    'upstream' = forked repo
  <branch> 
    'master'   = on GitHub, will be tracked by search engines 
    'gh-pages' = GitHub will automatically serve and host website files on:
                 http://username.github.io/repository

--------------------------------------------------------------------------------
                                    Forks
--------------------------------------------------------------------------------

  = copies of repositories on GitHub 
  * used for - creating your own version of a project 
             - contributing fixes or features to the original project

git clone <URL>
  = creates a local copy of remote repo + 'origin' connection to it

git remote add upstream <URL>
  * to pull changes from the original...

--------------------------------------------------------------------------------
                                   Branches
--------------------------------------------------------------------------------

  = 
