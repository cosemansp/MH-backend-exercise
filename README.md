# mediahuis-github-api

Mediahuis Backend Exercise

## Prerequisites

- [Node 11.x](https://nodejs.org/en/) or higher
- [Yarn Package Manager](https://yarnpkg.com/en/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started

```bash
# install all dependencies
$ yarn

# start application (graphql & math exercise)
# API doc, see below
$ yarn start:watch
$ GITHUB_TOKEN=xxxxxxx yarn start:watch

# run unit tests
$ yarn test
$ yarn test:watch
```

## Features

- [x] Github Graphql API
- [x] Sub-rectangle REST API
- [x] React SSR discussion

## React SSR

Server side-rendering is crucial for a whole lot of reasons.
Explain in your own words why it is crucial and how you would approach it.

Server side-rendering is the oposite of client side rendering where the UI is created at runtime in the browser. Today we don't write a full html page anymore but its more a combination of html snippets and lots of javascript that creates the html/css pages at runtime in the browser. This way we can be very dynamic; gets the data from an API, add structure, styling and animation to provide te best user experiance. But this comes at a price: No UI is displayed before all javascript is loaded and processed. So it's takes a while to show the initial screen to the user. For a business app, running on a local and fast internet app there is no issue. But for public sites, available on all devices (fast and slow), all type of networks (wifi to slow Edge) this can be problematic. Hitting a server will return a blank page and it can take some time before we see the rendered page.
Also when SEO is important (and yes it is for Mediahuis) you can get punished by not providing pure html. Most search engine will handle javascript rendering but because it slower and more tricky to crawle the side your ranking will be lower. And if ranking is super importance you should not use client side rendering.

So if client side rendering is slower (for the initial screen) and bad for SEO we have a solution in serverside rendering. In stead of rendering the page in the client we do it on the server. The server will run our react code, call our API (mostly local) and finally return a full html page (with CSS) to our browser. The browser can display is more quickly (no rendering required) user gets a feeling the side it up and runnig more quickly. In the background the javascript is loaded and the site becomes fully functional. Also SEO engines just have to look at the HTML and your ranking gets higher.

This SSR looks great but is not so easy to do. First there is significant hit on the server. The server has to render the page for all clients. The rendering is synchronous (ReactDOMServer.renderToString) so you need multiple core to handle the load (in stead of just serving html and js files). Best is to cache the renderen pages but this also adds complexity. Next the application must be created on a special way to not using any browser api's (cookie, local storage, redirect) and no loading screens are allowed. You must first fetch the data and then render the components. Mostly this is the oposite with CSR. More difficult is becomes when your have a component tree where deeper components need to fetch data and rendering it.

SSR comes in two flavors;

- The server renders the page when the request comes in. In this case you can still have a delay that the server needs to do the rendering.
- The site is rendered during a build process and the cached HTML pages (file) are ready to be served. This gives the quickest response. This is also called pre-rendering.

For sites with infrequent changes (typically corporate sites) a pre-rendered solution is the best. The server has to render the site once and can server the html directly.

For sites that have frequest changes or the content is tailored to the user you need runtime SSR.

Multiple solutions are already available to have SSR with react. Next.js & Razzle are the main frameworks that handles most of the hard work for you (data fecthing, routing, server code with rendering, ...). If you want to go for pre-rendering gatsby is the defactoy standard with react.

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

## Resources used

- [Maximum Sum Rectangular Submatrix in Matrix dynamic programming/2D kadane](https://www.youtube.com/watch?v=yCQN096CwWM)

- [Kadane's Algorithm to Maximum Sum Subarray Problem](https://www.youtube.com/watch?v=86CQq3pKSUw)
