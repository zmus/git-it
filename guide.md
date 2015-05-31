--------------------------------------------------------------------------------
## Workflows
```
create a repository  >  stage snapshot  >  commit snapshot
```
```
LOCAL version 
  >>> PUSH changes >>> 
  <<< PULL changes <<< 
REMOTE version (on GitHub server)
```

--------------------------------------------------------------------------------
## Configure Git
```
git --version
```
```
git config user.name "<fullName>"
git config user.email <email>
```
  * `--global` = for all repositories
  * to be recorded in any newly created commits
  
--------------------------------------------------------------------------------
## Repository

A repository is a project folder (working directory).
````
git init
```
  = make folder a repository
  
--------------------------------------------------------------------------------
## Commit

```
git status
```
  = view  modified / staged / untracked  files 
```
git diff
```
  = view changes since last commit
```
git log  
```
  = commit history
    * commit: 'SHA-1 checksum of commit contents' => unique ID for a commit  
  + --oneline = condense output to a single line
  + <filename> = only <filename> history

```
git add <filenames>
```
  = stage files for the next commit
  * '.' stage all files
```
git commit  -m "<message>"
```
  = commit staged snapshot


**snapshot**
  = state of project at a given point in time

**staging**
  = creating a snapshot 

**commit**
  = save staged snapshot, with a descriptive message

To keep project small and efficient, you should only track source files and 
omit anything that can be generated from those files.

Committed snapshots can be seen as “safe” versions of the project. 
Git will never change them. 

--------------------------------------------------------------------------------
## GitHub
```
git config --global user.username <userName>
```
  = GitHub username
  * case sensitive
