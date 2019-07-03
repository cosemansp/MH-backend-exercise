# mediahuis-github-api

Graphql API Exercise

## Prerequisites

- [Node 11.x](https://nodejs.org/en/) or higher
- [Yarn Package Manager](https://yarnpkg.com/en/) (an alternative to npm)
- [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started

```bash
# install all dependencies
$ yarn

# start application
$ yarn start:watch
$ GITHUB_TOKEN=xxxxxxx yarn start:watch

# run unit tests
$ yarn test
```

## Features

- [x] Github Graphql API
- [x] Sub-rectabgle REST API
- [x] REST Error handler

## API

### Mathematical problem

```
POST http://localhost:4000/api/sub-rect
{
  input: [0, -2, -7, 0, 9, 2, -6, 2, -4, 1, -4, 1, -1, 8, 0, -2],
  rowLength: 4
}

result
{
  sumLargestSubRectangle: 15
}
```

### Graphql

```
# opens the  graphql Playground
GET http://localhost:4000/graphql
```

```
{
  commit(ower: "cosemansp", repo: "MH-backend-exercise" commitSha: "50c1eabe5ac3d0845495d562304a60f9f4d50243") {
    sha
    url
    author{
      name
      email
      date
    }
    committer{
      name
      email
      date
    }
    tree {
      sha
      url
    }
    ...
  }
}
```
