--------------------------------------------------------------------------------
## Workflow
--------------------------------------------------------------------------------

create a repository -> stage snapshot -> commit snapshot

--------------------------------------------------------------------------------
## Configure Git
--------------------------------------------------------------------------------

git --version

git config --global user.name "<Your Name>"

git config --global user.email "<email>"

--------------------------------------------------------------------------------
## Repository
--------------------------------------------------------------------------------

A repository is a project folder (working directory).

git init
  = make folder a repository

git status
  = check if repository

--------------------------------------------------------------------------------
## Commit
--------------------------------------------------------------------------------

git status
  = check repo for changes

git add <file>
  = add file to the snapshot for the next commit

git add .
  = add all files

git commit [ -m "<commit message>" ]
  = commit (aka save) changes to repo's history

git diff
  = view changes to files since last commit

snapshot 
  = state of project at a given point in time

staging
  = creating a snapshot 

commit
  = 


To keep a project small and efficient, you should only track source files and 
omit anything that can be generated from those files.


