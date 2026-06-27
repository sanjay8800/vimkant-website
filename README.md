<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/48ecb56d-4c71-41a0-851f-9f64f31d39b4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project can publish the static front-end to GitHub Pages, but the AI Stylist feature requires a server backend and a Gemini API key. GitHub Pages will host the site UI only.

1. Install dependencies:
   `npm install`
2. Build the app:
   `npm run build`
3. Create a GitHub repository and push this project to it.
4. Deploy to GitHub Pages:
   `npm run deploy`

> Note: The `/api/stylist` endpoint is served by `server.ts`, so the AI recommendation form will not work on GitHub Pages without a separate backend service.
