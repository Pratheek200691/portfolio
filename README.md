# Pratheek D Jain — Portfolio

A **futuristic mechanical robot developer portfolio** built with HTML5, CSS3, TypeScript, and Vite.

## ✨ Features

- 🤖 **AI Robot Assistant** — Futuristic CSS-drawn robot face with animated eyes, mouth, and waveform
- ⚙️ **Animated Gear Background** — SVG mechanical cogwheels with multi-layer depth
- 📜 **Scroll-Controlled Navigation** — One section per scroll, with wheel/keyboard/touch support
- 🗣️ **Web Speech API** — Robot speaks section explanations with male voice auto-selection
- 🔤 **Word-by-Word Text Reveal** — Synchronized text appears as the robot speaks
- 📧 **Working Contact Form** — EmailJS integration with validation
- 🖱️ **Custom Futuristic Cursor** — HUD-ring cursor with hover glow effects
- 📱 **Fully Responsive** — Desktop (split left/right), Tablet, Mobile (stacked)
- ♿ **Accessible** — Semantic HTML, ARIA labels, keyboard navigation, focus states

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📧 Setting Up the Contact Form (EmailJS)

The contact form uses **EmailJS** (free tier available at [emailjs.com](https://www.emailjs.com/)).

### Steps:

1. **Create an EmailJS account** at https://www.emailjs.com/
2. **Add an Email Service** (Gmail, Outlook, etc.) → note your **Service ID**
3. **Create an Email Template** with these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{message}}` — message body
   - `{{to_name}}` — recipient name
   - `{{to_email}}` — your email
4. **Copy your Public Key** from Account → General
5. **Update `src/data/config.ts`**:

```typescript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_abc123',    // ← Your Service ID
  TEMPLATE_ID: 'template_xyz789', // ← Your Template ID
  PUBLIC_KEY: 'abcDEFghiJKL',     // ← Your Public Key
  TO_EMAIL: 'jainpratheekd@gmail.com',
};
```

---

## 🔗 Adding Your Real Project URLs & Social Links

### Social Links — `src/data/config.ts`

```typescript
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/YOUR_USERNAME',
  LINKEDIN: 'https://www.linkedin.com/in/YOUR_ID',
};
```

### Project URLs — `src/data/portfolioData.ts`

Find the `FEATURED_PROJECTS` and `OTHER_PROJECTS` arrays and replace:
- `YOUR_SPAM_SHIELD_DEMO_URL` → your Spam Shield demo URL
- `YOUR_SPAM_SHIELD_GITHUB_URL` → your GitHub repo URL
- `YOUR_BLOOD_DONATION_DEMO_URL` → your Blood Donation demo URL
- etc.

Also replace the **Project Alpha/Beta/Gamma** placeholders with your real projects.

### Project buttons in HTML — `index.html`

Find the `<a href="#">` tags in the project sections and replace `#` with your real URLs.

---

## 📁 Project Structure

```
portfolio/
├── index.html                    # Main HTML (all sections)
├── src/
│   ├── main.ts                   # App entry, boot sequence, orchestration
│   ├── scrollController.ts       # Wheel/touch/keyboard navigation
│   ├── robotAssistant.ts         # Robot face animation states
│   ├── speechController.ts       # Web Speech API wrapper
│   ├── animations.ts             # Section transitions, word reveal
│   ├── contactForm.ts            # EmailJS form handler
│   └── data/
│       ├── portfolioData.ts      # ← Edit this to update content
│       └── config.ts             # ← Edit this for EmailJS & social links
├── styles/
│   ├── main.css                  # Design tokens, all components
│   ├── animations.css            # Keyframe animations
│   ├── robot.css                 # Robot face & HUD styles
│   └── responsive.css            # Breakpoints & mobile layout
├── public/
│   └── assets/
│       ├── images/               # Static images
│       │   └── robot-face.png    # Generated robot image
│       └── videos/               # Place gears.mp4 here if you have one
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎮 Navigation Controls

| Input | Action |
|-------|--------|
| Mouse wheel | Next / Previous section |
| ↓ Arrow / Space | Next section |
| ↑ Arrow | Previous section |
| Swipe up (mobile) | Next section |
| Swipe down (mobile) | Previous section |
| Nav dots (sidebar) | Jump to section |
| ▲ ▼ buttons | Next / Previous |

---

## 🎨 Adding a Video Gear Background

If you have a `gears.mp4` video of rotating mechanical gears:

1. Place it at `public/assets/videos/gears.mp4`
2. Add this to `index.html` inside `.gears-container`:

```html
<video autoplay muted loop playsinline class="gears-video">
  <source src="/assets/videos/gears.mp4" type="video/mp4" />
</video>
```

3. Add CSS:
```css
.gears-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.08;
}
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — deploy anywhere (Netlify, Vercel, GitHub Pages, etc.).

---

## 🌐 Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Web Speech API | ✅ | ✅ | ✅ | ✅ |
| CSS Animations | ✅ | ✅ | ✅ | ✅ |
| SVG Gears | ✅ | ✅ | ✅ | ✅ |

> **Note:** Web Speech API voice availability varies by OS. The app automatically selects the best available male English voice.

---

## 📞 Contact

**Pratheek D Jain** — jainpratheekd@gmail.com
