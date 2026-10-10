<div align="center">

# Harish Naik N | Developer Portfolio

**Software Developer & AI Enthusiast**

A responsive, animated personal portfolio built with React, GSAP and three.js, showcasing my projects, skills and certifications in AI, IoT and full-stack development.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![GSAP](https://img.shields.io/badge/GSAP-0AE448?style=for-the-badge&logo=greensock&logoColor=black)
![Three.js](https://img.shields.io/badge/three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

[Live Demo](https://your-portfolio-url.vercel.app) · [Report a Bug](https://github.com/HARISH2244-AI/your-repo-name/issues) · [Connect on LinkedIn](https://www.linkedin.com/in/your-linkedin)

</div>

---

## Preview

> Replace this with a screenshot of your site. Save it as `screenshots/home.png` in the repo.

![Portfolio preview](./screenshots/home.png)

## About

I am a 3rd-year Electronics and Computer Engineering student at **Atria Institute of Technology, Bengaluru** (B.E., 2024–2028). I am passionate about Artificial Intelligence, IoT systems, software development and renewable energy technologies, and I enjoy building projects that solve real-world problems.

This portfolio is where I present that work: who I am, what I build, the tools I use and the certifications I have earned.

## Features

- **Modern, responsive design** that adapts from large desktop screens down to phones, with a collapsible mobile menu.
- **GSAP animations**: an animated hero introduction, scroll-triggered section reveals with staggered cards, and a subtle parallax effect on the hero.
- **three.js hero background**: an interactive particle network and rotating wireframe core that reacts to mouse movement and scrolling.
- **Custom cursor**: an orange dot with a trailing ring that scales up over interactive elements.
- **Magnetic buttons** that gently pull toward the cursor.
- **Certificates gallery** with a full-size viewer (click an image to enlarge, press `Esc` to close).
- **Active section highlighting** in the navigation bar as you scroll.
- **Contact form** that opens your email client with the message pre-filled.
- **Accessibility-minded**: respects the `prefers-reduced-motion` setting and keeps the normal cursor on touch devices.

## Sections

| Section | Description |
| --- | --- |
| Home | Introduction, availability status, role and quick links to social profiles |
| About | Background, education, location and interests |
| Skills | Languages, frameworks and hardware platforms I work with |
| Projects | Featured projects with descriptions, tech tags and source links |
| Certificates | Course completion certificates with a full-size viewer |
| Contact | Contact form, email and social links |

## Featured Projects

- **SolarMind AI**: AI-based rooftop solar monitoring with an automatic dry cleaning system that keeps panels efficient and reduces manual maintenance.
- **Fake Payment Screenshot Detection**: an AI-powered fraud detection system that verifies UPI payment screenshots and helps prevent fake payment scams.

## Tech Stack

| Category | Technologies |
| --- | --- |
| Framework | React |
| Animation | GSAP (with ScrollTrigger) |
| 3D / Graphics | three.js |
| Styling | CSS3 (custom properties, Grid, Flexbox) |
| Icons | react-icons |
| Fonts | Poppins, Great Vibes (Google Fonts) |

## Project Structure

```text
.
├── public/
│   └── resume.pdf              # Resume used by the "Download Resume" button
├── src/
│   ├── assets/
│   │   ├── profile.png         # Hero photo (transparent-background PNG works best)
│   │   └── certificates/       # Certificate images
│   ├── App.js                  # All sections, animations, cursor and 3D scene
│   ├── App.css                 # Styling and responsive rules
│   └── index.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HARISH2244-AI/your-repo-name.git

# 2. Move into the project folder
cd your-repo-name

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The site will be available at `http://localhost:3000`.

> If dependencies are missing, install them manually with:
> `npm install react-icons gsap three`

### Production build

```bash
npm run build
```

The optimized site is generated in the `build/` folder.

## Customization

Most personal details are defined at the top of `src/App.js`:

| What to change | Where |
| --- | --- |
| GitHub, LinkedIn, Instagram links and email | `GITHUB`, `LINKEDIN`, `INSTAGRAM`, `EMAIL` constants |
| Skills shown in the grid | `skills` array |
| Projects | `projects` array (`title`, `desc`, `tags`, `demo`, `code`) |
| Certificates | `certificates` array (`title`, `issuer`, `date`, `img`, `link`) |
| Hero photo | Replace `src/assets/profile.png` |
| Resume | Replace `public/resume.pdf` |
| Colours | CSS variables at the top of `src/App.css` (`--gold`, `--cream`, and so on) |

To add a certificate, place the image in `src/assets/certificates/`, import it at the top of `App.js`, and add a new entry to the `certificates` array.

## Deployment

The project can be deployed to any static hosting provider. With [Vercel](https://vercel.com/):

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Keep the default settings (framework preset: Create React App) and deploy.

[Netlify](https://www.netlify.com/) and [GitHub Pages](https://pages.github.com/) work in the same way.

## Roadmap

- [ ] Add live demo links for each project
- [ ] Add a blog or articles section
- [ ] Add more projects and certifications as I complete them
- [ ] Connect the contact form to an email service

## Contact

**Harish Naik N**

- GitHub: [@HARISH2244-AI](https://github.com/HARISH2244-AI)
- LinkedIn: [your-linkedin](https://www.linkedin.com/in/your-linkedin)
- Email: [nharish748@gmail.com](mailto:nharish748@gmail.com)
- Location: Bengaluru, Karnataka, India

---

<div align="center">

If you like this project, consider giving it a ⭐ on GitHub.

</div>
