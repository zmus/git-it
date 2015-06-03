--------------------------------------------------------------------------------
                                 Configure Git
--------------------------------------------------------------------------------

git --version

git config user.name "<fullName>"
git config user.email <email>
  * used in commits (everyone will see it)
  
  + --global 
      = for all repositories

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
                            Remote - Push - Pull
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

  + --delete
    = delete branch from remote

git pull <remoteName> <branchName>
  = pull in changes

git fetch --dry-run
  = see changes to the remote before you pull in

conventions:
  <remote>
    'origin'   = main
    'upstream' = forked repo
  <branch> 
    'master'   = main default ( on GitHub, will be tracked by search engines ) 
    'gh-pages' = GitHub will automatically serve and host static website on:
                 http://username.github.io/repository

--------------------------------------------------------------------------------
                                    Forks
--------------------------------------------------------------------------------

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
      = rename a current branch

  + -d <branchName>
      = delete branch

git checkout <branchName>
  = switch to a branch

  + -b
      = create and switch to a branch  

git merge <branchName>
  = merge branch into the current branch




