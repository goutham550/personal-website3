# Personal Website

A clean, responsive single-page personal website built with just HTML, CSS, and JavaScript. Includes dark/light/system theme, smooth scrolling, and a simple, accessible layout.

## Quick start

- Open `index.html` in your browser, or use a local server.
- Edit the content in `index.html`:
  - Replace "Your Name" and update the About, Projects, and Contact sections
  - Update the email link in the Contact section
  - Add your social/profile links
- Tweak styles in `styles.css` (colors, spacing, layout)
- Adjust behavior in `script.js` (theme toggle, mobile menu, smooth scroll)

## File structure

```
personal-website/
├── assets/
│   ├── favicon.svg
│   └── profile.svg
├── index.html
├── script.js
└── styles.css
```

## Customization tips

- Theme colors are defined as CSS variables in `styles.css` under `:root`, with overrides for `html[data-theme="light"]` and `html[data-theme="dark"]`.
- The theme toggle cycles between system → light → dark and remembers your choice in `localStorage`.
- Replace `assets/profile.svg` with your photo (e.g., `profile.jpg`) and update the `<img>` `src` in `index.html`.
- Add real project links to the buttons in the Projects section.

## Deploy

- GitHub Pages: push this folder to a repo and enable Pages in settings.
- Vercel/Netlify: drag-and-drop this folder in the dashboard, or link a repo. Root is the project folder; output is static.

## License

MIT — customize and reuse freely.


