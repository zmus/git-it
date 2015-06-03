Commit changes:
```  
create a repository  >  stage snapshot  >  commit snapshot
```
**repository** = project folder (working directory)

**snapshot** = state of project at a given point in time

**staging** = creating a snapshot 

**commit** 
  = save staged snapshot, with a descriptive message
  * SHA-1 checksum of commit contents = commit's unique ID  

To keep project small and efficient, you should only track source files and 
omit anything that can be generated from those files.

Committed snapshots can be seen as “safe” versions of the project. 
Git will never change them. 


Push and pull commited changes:
```
LOCAL version   >>> PUSH changes >>>   REMOTE version (on GitHub server) 
                <<< PULL changes <<< 
```
Sometimes CONTRIBUTING.md is used besides README.md

**.gitignore** = list of files Git should not track (e.g. files with passwords)


Forking:
```
FORK a repo  >  CLONE it from GitHub  >  connect original (upstream)
```
**fork** = copy of repository on GitHub used for 
  - creating your own version of a project 
  - contributing fixes or features to the original project

Make sure you aren't cloning inside of another Git repository !


Working on a branch:
```
create a BRANCH  > CHECKOUT  >  work on a branch  >  CHECK-IN
```
**branch** = isolated copy of a project
  * When branch is ready, merge it back into the 'master'
  * rule: Anything in the 'master' branch must always be deployable!
  * Names should be descriptive (e.g. refactor-authentication)

to **checkout** a branch = move onto a branch

to **check-in** a project = commit and push changes



### Collaboration
Add collaborators:
```
GitHub / Settings / Collaborators
```
**collaborators** = GitHub users with permission to make edits to others repos

Contribute:
```
fork  >  clone  >  create branch  >  commit  >  push to GitHub  >  send pull request
```
**pull** = pull in changes from a remote

**pull request** = ask maintainers of the original repo to pull changes you've made in a forked repo
  
  
  
### Flags

Linux convention. Case sensitive.

one character:  
  * one dash  
  * -aParameter
  * may or may not be an abbreviated form of longer flag

multi-character:
  * two dashes
  * --author=Parameter
