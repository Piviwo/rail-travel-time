# Flowchart for Our Workflow on Git
```mermaid
flowchart TB;
    A[Create your Branch and choose a branch name based on your task for it: git branch yourBranchName] --> B[C:\Users\ricat\Documents\TU Wien\Webmapping\Group Project\rail-travel-time];
     B --> C[Add your Changes:\n git add -A];
    C --> D[Commit your Changes:\n git commit -m 'write a message that describes your work well'];
    D --> E[Push your changes to your branch: git push -u origin yourBranchName];
    E --> F[Go to Github and Create Pull Request,\n Assign Reviewer in Github and Give a Message to your Reviewer];
    F --> G[Reviewer to check the Branch by getting the current state:\n git fetch origin];
    G --> H[Reviewer go to branch to check:\n git checkout branchName];
    H --> I[Reviewer runs branch and sees if everthing works];
    I -->|Works| J[Reviewer then commit changes from the Github page and delete];
    I -->|Does not Work| M[Reviewer write person about problems and\n Person to change problems and\n commit 'git commit -m 'comment on the changes''\n and push only these changes];
    J --> K[Reviewer write to chat to pull an update from main branch:\n git checkout main; git pull; git checkout yourLocal/CurrentBranchName;];
    K -- Major Changes --> L[Update to current state of the main branch:\n git rebase main];
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
