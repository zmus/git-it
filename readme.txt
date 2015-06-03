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

--------------------------------------------------------------------------------
  create a repository  >  stage snapshot  >  commit snapshot
--------------------------------------------------------------------------------

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

** to checkout ** a branch
  = 

--------------------------------------------------------------------------------
                                 Configure Git
--------------------------------------------------------------------------------

git --version

git config user.name "<fullName>"
git config user.email <email>
  
  + --global 
      = for all repositories

  * used in commits (everyone will see it)
--------------------------------------------------------------------------------
                                  Repository
--------------------------------------------------------------------------------

git init
  = make folder a repository
  
--------------------------------------------------------------------------------
                                    Commit
--------------------------------------------------------------------------------

git status
  = view  branch + modified / staged / untracked  files 

git diff
  = view changes since last commit

git log  
  = view commit history

  + --oneline  
      = condense output to a single line

  + <filename> 
      = only for this file

git add 
  + <filenames>
      = stage files for the next commit
  + .
      = stage all files
  + -A
      = stage all, including additions and deletions 

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

add remote connection > push + pull 

git remote 
  = list remote connections

  + -v 
      = show URLs

  + add <remoteName> <URL> 
      = add remote connection

  + set-url <remoteName> <URL>
      = set URL to an existing remote

git push <remoteName> <branchName>
  = push changes

git pull <remoteName> <branchName>
  = pull in changes

conventions:
  <remote>
    'origin'   = main
    'upstream' = forked repo
  <branch> 
    'master'   = on GitHub, will be tracked by search engines 
    'gh-pages' = GitHub will automatically serve and host static website on:
                 http://username.github.io/repository

--------------------------------------------------------------------------------
                                    Forks
--------------------------------------------------------------------------------

fork a repo  
clone it from GitHub  
connect original (upstream) 

git clone <URL>
  = creates a local copy of remote repo + 'origin' connection to it

git remote add upstream <URL>
  * to pull changes from the original...

--------------------------------------------------------------------------------
                                   Branches
--------------------------------------------------------------------------------

git branch 
  = list branches + current branch

  + <branchName>
      = create a new branch
      * case sensitive

  + -m <newBranchName>
      = rename a currentg branch

git checkout <branchName>
  = switch to a branch

  + -b
      = create and switch to a branch  





