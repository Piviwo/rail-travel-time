# Flowchart for Our Workflow on Git
```mermaid
flowchart TB;
    A[Create your Branch\n and choose a branch name based on your task for it:\n "`_git branch yourBranchName_`"] --> B[Work on your Task];
     B --> C["Add your Changes:\n _git add -A_"];
    C --> D[Commit your Changes:\n _git commit -m 'write a message that describes your work well'_];
    D --> E[Push your changes to your branch: _git push -u origin yourBranchName_];
    E --> F[Go to Github and Create Pull Request,\n Assign Reviewer in Github and Give a Message to your Reviewer];
    F --> G[Reviewer to check the Branch by getting the current state:\n _git fetch origin_];
    G --> H[Reviewer go to branch to check:\n _git checkout branchName_];
    H --> I[Reviewer runs branch and sees if everthing works];
    I -->|Works| J[Reviewer then commit changes from the Github page and delete];
    I -->|Does not Work| M[Reviewer write person about problems and\n Person to change problems and\n commit _git commit -m 'comment on the changes'_\n and push only these changes];
    J --> K[Reviewer write to chat to pull an update from main branch:\n _git checkout main_, _git pull_, _git checkout yourLocal/CurrentBranchName_];
    K -- Major Changes --> L[Update to current state of the main branch:\n _git rebase main_];
    K -- No Major Changes --> N[End];
    L --> N;
    M --> G;
    
   

```
# Further rules

*  If you created a pull request and your reviewer is working on it, then do not push new other changes to the same branch.
*  If you need to change something on the current pull request, push only the commit the changes.
*  Create branches based on tasks and when startin a new task, create a new branch.
*  When doing a pull request, then checkout away from this branch locally, so it can be nicely deleted later.
*  Do not put passwords in plain text (or do not push them then).
*  When we update main branch, we can rebase, especially when the changes are fundamental.
