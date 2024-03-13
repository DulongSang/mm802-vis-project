# MM802 Winter2024 Visualization Mini-project

## Group Members
- [Dulong Sang](https://github.com/DulongSang): dulong &lt;at&gt; ualberta &lt;dot&gt; ca
- [Mingwei Lu](https://github.com/MingweiLu): mlu1 &lt;at&gt; ualberta &lt;dot&gt; ca


## Data Source

[Fire Response: Current and Historical](https://data.edmonton.ca/Emergency-Services/Fire-Response-Current-and-Historical/7hsn-idqi/about_data) on City of Edmonton's Open Data Portal


## Installation

### Requirements
- Node.js >= v20.5.0

### Install/Update Dependencies

```bash
npm install
```

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Contribution Guidelines

### Commit

We use [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) as the project commit specification.

The commit message should be structured as follows:
```
<type>[optional scope]: <description>

[optional body]
```

The following *type*s are generally used: `feat`, `fix`, `chore`, `docs`, `test`

An example of the commit message would be:
```
feat: allow provided config object to extend other configs
```

### Pull Request (PR)

- All changes should be merged via a PR, please use the 'squash and merge' or 'rebase and merge' to keep a linear history.

- When creating a PR, please ensure that the branch name is descriptive and easy to understand, e.g. `user-input-validaton`.

```bash
git checkout -b '<new-branch-name>'
git commit ...
git push -u origin '<new-branch-name>'
```

- When updating a PR, make sure it is rebased on top of most recent `main`.

```bash
git fetch
git rebase origin/main
git push -f
```
