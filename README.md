# PixCut

Pixel-perfect URL trimming with copy-ready short links and instant QR codes. Built with Express, EJS, MongoDB, and shortid.

## Features
- Shorten URLs with unique short codes (duplicates return the existing short link)
- Auto-generated QR codes for each shortened link
- Copy-to-clipboard helper for the generated short URL
- Simple Bootstrap UI served from the same Express app

## Requirements
- Node.js 18+
- MongoDB instance (local or hosted)

## Quick Start
1. Install dependencies
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```env
   PORT=3000
   MONGODB=mongodb://localhost:27017/pixcut
   ```
3. Run the server in dev mode
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 and shorten a URL.

## API
- `POST /shortUrls`
  - Body: `{ "fullUrl": "https://example.com" }`
  - Success: `{ "full": "https://example.com", "short": "AbCdEf" }`
- `GET /:short`
  - Redirects to the full URL for the provided short code

## Data Model
- `Url` document
  - `full` (string, required, unique)
  - `short` (string, generated via shortid, required)

## Scripts
- `npm run dev` — start the server with nodemon

## Notes
- Static assets live in `public/`; the main view is `views/index.ejs`.
- QR codes are generated client-side via the qrserver.com API.
