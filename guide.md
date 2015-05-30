--------------------------------------------------------------------------------
## Workflow
--------------------------------------------------------------------------------

create a repository -> stage snapshot -> commit snapshot

--------------------------------------------------------------------------------
## Configure Git
--------------------------------------------------------------------------------

git --version

git config user.name "<Your Name>"
git config global user.email <email>
  + --global = for all repositories

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
  = view untracked and modified files + staged snapshot

git diff
  = view changes since last commit

git log
  = commit history
    * commit: 'SHA-1 checksum of commit contents' => unique ID for a commit
  + --oneline 
    = condense output to a single line
  + <filename> 
    = only <filename> history


git add <filenames>
  = add files to the snapshot 

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

