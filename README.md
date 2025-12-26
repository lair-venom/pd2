# Lair Venom - PAYDAY 2 Randomizer

Modern, sleek mission randomizer for PAYDAY 2 with beautiful dark theme and orange accents.

## Features

- Random difficulty selection (Normal to Death Sentence)
- Random heist selection from 30+ heists
- Random approach (Stealth or Loud)
- Customizable difficulty filter (select specific difficulties you want)
- Customizable heist filter (select specific heists you want)
- Beautiful dark theme with orange glow effects
- Smooth animations and transitions
- Custom scrollbar design
- Persistent settings stored in browser localStorage

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages when you push to the main branch.

### Setup Instructions:

1. Create a new repository on GitHub
2. Push this code to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. Enable GitHub Pages in your repository:
   - Go to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source
   - The site will automatically deploy when you push changes

4. Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
