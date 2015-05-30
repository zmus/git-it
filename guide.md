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

git diff
  = view changes to files since last commit


git add <filename>
  = add file to the snapshot 

git add .
  = add all files

git commit  -m "<commit message>" 
  = commit (aka save) changes to repo's history


snapshot 
  = state of project at a given point in time

staging
  = creating a snapshot 

commit
  = record the staged snapshot, with a descriptive message

To keep a project small and efficient, you should only track source files and 
omit anything that can be generated from those files.

Committed snapshots can be seen as “safe” versions of the project. 
Git will never change them. 

--------------------------------------------------------------------------------
## Commit
--------------------------------------------------------------------------------

