# Readme badges refresher action

This actions purges the github camo cache for badges present in the readme of your repository

## Inputs

### `repository`

**Required** the name of the repository where to refresh badges, using format <user>/<repository>. ex: `b3b00/refreshBadgesActions` for this repository

### `branch`

**Optional** the name of the branch to refresh (default to `main`). ex : `develop` 



## Outputs

 no outputs
 
## example
For repository [CSLY](https://gitgub.com/b3b00/csly) on branch `dev`

```yaml
- name: refresh badges
      uses: b3b00/refreshBadgesAction@v1.0.7
      with:
        repository : 'b3b00/csly'
        branch: dev
```
