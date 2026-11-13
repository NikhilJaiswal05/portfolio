# Nikhil Jaiswal – Portfolio Website

A simple personal portfolio built with only HTML, CSS and JavaScript. No build step, no frameworks. It works directly on GitHub Pages.

## Folder structure

```
portfolio/
├── index.html                 Page content (text, education, skills, training, contact)
├── css/style.css              Colors, fonts and layout
├── js/script.js               Projects and certificates data, theme toggle, menu
├── assets/
│   ├── images/                profile.jpg and project1.jpg go here
│   └── documents/resume.pdf   Your resume (download button)
└── README.md
```

## Before you publish

Already done: your photo (`assets/images/profile.jpg`), resume (`assets/documents/resume.pdf`) and the IBM AI Literacy verification link are included.

Still to add:

1. **Project image** – save a screenshot as `assets/images/project1.jpg`. Until then, a grey placeholder is shown.
2. **Project GitHub link** – open `js/script.js`, find the `links: [ ... ]` part of the project and add your repository link (an example is in the comments).
3. **Tally Prime institute and year** – open `index.html`, find the "Diploma in Financial Accounting" item in the Education section and add the line shown in the comment.

To change the photo or resume later, replace the file and keep the same file name.

## How to edit content

| What | Where |
|---|---|
| Name, intro, About text, Education, Skills, Training, Contact | `index.html` (each section is marked with a comment) |
| Projects | `PROJECTS` list at the top of `js/script.js`. Copy one `{ ... }` block to add another project |
| Certificates | `CERTIFICATIONS` list in `js/script.js`. Same method |
| Colors and fonts | CSS variables at the top of `css/style.css` (`--accent`, `--bg`, `--ink`, ...) |

If the projects or certificates list is empty, that section and its menu link are hidden automatically.

## Deploy on GitHub Pages

1. Log in to GitHub and click **New repository**. Give it a name (for a link like `https://NikhilJaiswal05.github.io`, name it exactly `NikhilJaiswal05.github.io`; any other name also works).
2. Choose **Public** and create the repository.
3. Click **Add file → Upload files**. Upload everything **inside** the `portfolio` folder (`index.html`, `css`, `js`, `assets`, `README.md`) so that `index.html` is at the top level of the repository. Click **Commit changes**.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Choose branch **main** and folder **/ (root)**, then click **Save**.
6. Wait 1–2 minutes, refresh the Pages screen, and open the live link shown there.
7. Add this link to your LinkedIn profile and resume.

## Test on your computer

Double-click `index.html` to open it in a browser. For the closest match to GitHub Pages, run `python -m http.server` inside the folder and open `http://localhost:8000`.

## Notes

- Fonts (IBM Plex) load from Google Fonts. If the internet is off, the site uses your system fonts.
- The theme (light or dark) is saved in the browser.
