
# Firebase Functions
Crawl website and take screenshots using Cheerio and Puppeteer.

## Quick Start

Clone repo:
```bash
git clone https://github.com/heyharmon/firebase-functions.git
```

Open /functions:
```bash
cd firebase-functions/functions
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

## Deploy to Firebase

Update firebase.json with project details from Firebase console

Log into Firebase
```bash
firebase login
```

Deploy
```bash
firebase deploy
```

Optionally add a deployment commit message
```bash
firebase deploy -m 'Deploying with such feature'
```

You can rollback a deployment from within the Firebase console

## S3

Using S3? [Here's how to setup permissions](https://medium.com/p/fcd239c8e6e4)

## API

Local base URL: `http://localhost:5000/firebase-functions/us-central1`

### Screenshots

| Method | Path | Params | Function ||
|--|--|--|--|--|
| GET | /screenshot | url | Get a fullpage screenshot | [Open](http://localhost:5000/firebase-functions/us-central1/screenshot?url=https://bloomcu.com) |