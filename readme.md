
# Serverless Scraping Functions
Scrape using [Puppeteer](https://github.com/puppeteer/puppeteer) and [Cheerio](https://github.com/cheeriojs/cheerio). Run by [Serverless Cloud Functions](https://firebase.google.com/docs/functions).

Puppeteer controls Chrome, so you can navigate and screenshot pages. Cheerio parses HTML like jQuery does, so you can scrape anything from the DOM. Everything is glued together nicely with ExpressJS routes and controllers.

## Quick Start

Clone repo:
```bash
git clone https://github.com/heyharmon/scraping-functions.git
```

Open /functions:
```bash
cd scraping-functions/functions
```

Install dependencies:
```bash
npm install
```

Install Firebase CLI
```bash
npm install -g firebase-tools
```

Serve locally
```bash
firebase serve
```

## API

Local base URL: `http://localhost:5000/bloomcu-scraping-functions/us-central1`

### Screenshots

| Method | Path | Params | Function ||
|--|--|--|--|--|
| GET | /puppeteer/screenshot | url | Get a fullpage screenshot | [Open](http://localhost:5000/bloomcu-scraping-functions/us-central1/puppeteer/screenshot?url=https://bloomcu.com) |

### Scraping

| Method | Path | Params | Function ||
|--|--|--|--|--|
| GET | /cheerio/page | url | Get structured contents of page | [Open](http://localhost:5000/bloomcu-scraping-functions/us-central1/cheerio/page?url=https://bloomcu.com) |
