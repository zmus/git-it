<!-- ####################################################################### -->

## Workflows

```
create a repository  >  stage snapshot  >  commit snapshot
```
**snapshot** = state of project at a given point in time

**staging** = creating a snapshot 

**commit** = save staged snapshot, with a descriptive message

To keep project small and efficient, you should only track source files and 
omit anything that can be generated from those files.

Committed snapshots can be seen as “safe” versions of the project. 
Git will never change them. 

```
LOCAL version 
  >>> PUSH changes >>> 
  <<< PULL changes <<< 
REMOTE version (on GitHub server)
```


## Configure Git

```
git --version
```

```
git config user.name "<fullName>"
git config user.email <email>
```
  * used in commits (everyone will see it)
  * `--global` for all repositories
  

## Repository

= project folder (working directory)
 
````
git init
```
  = make folder a repository
  

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
  = view commit history
  * `--oneline` condense output to a single line
  * `<filename>` only for this file

"commit: SHA-1 checksum of commit contents" => unique ID for a commit  

```
git add <filenames>
```
  = stage files for the next commit
  * `.` stage all files

```
git commit  -m "<message>"
```
  = commit staged snapshot


## GitHub

```
git config --global user.username <userName>
```
  = GitHub username
  * case sensitive
