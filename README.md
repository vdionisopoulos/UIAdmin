v1.3.0 – July 2025
✅ Added favicon.ico support and Express static middleware fix
🔐 Fixed password strength checker integration with zxcvbn.js
🧪 Added password validation logic with entropy + crack time
🎨 Improved layout rendering (favicon, 404 handler, head cleanup)
⚙️ Diagnosed and documented browser-specific CSS warnings (Firefox)
v1.2.0 – July 2025
✨ Added collapsible sidebar menus for SLA and Password tools
🎨 Unified layout under AdminKit Bootstrap 5 admin template
🛠 Modularized header.ejs, footer.ejs, sidebar.ejs, and navbar.ejs
🚀 Added tool routes + partials for sla-comparison and sla-reverse
v1.1.0 – June 2025
🛠 Added Passphrase Generator with entropy and delimiter options
🔐 Improved password generation with better entropy estimates
🎯 Added settings.json handling for dark/light theme + comma delimiter
v1.0.0 – May 2025
🚀 Initial launch of SLAlytics Admin UI project
📊 Included SLA Calculator, SLA Comparison, SLA Reverse (SLE)
🔐 Added Password Generator and Strength Checker tools

# UIAdmin

📁 UIAdmin/                 <-- Root project folder
├── 📁 public/              <-- Public assets (served statically)
│   ├── 📁 css/
│   │   └── app.css         <-- Custom styles (overrides/themes)
│   ├── 📁 js/
│   │   ├── app.js          <-- Global UI logic (toggle/sidebar/etc)
│   │   ├── settings.js     <-- Dark/light theme, localStorage etc.
│   │   ├── search.js       <-- Search sidebar toggle logic
│   │   ├── ads-cookie.js   <-- Cookie bar, ad toggles
│   │   └── 📁 tools/
│   │       └── sla-calculator.js <-- Page-specific logic (uptime calc etc)
│   └── 📁 assets/
│       ├── logo.svg
│       └── favicon.ico

├── 📁 views/               <-- EJS view templates
│   ├── 📁 partials/
│   │   ├── header.ejs      <-- <head> section, title, CSS includes
│   │   ├── navbar.ejs      <-- Top navbar (theme toggle, search)
│   │   ├── sidebar.ejs     <-- Sidebar menu (with flyouts)
│   │   ├── searchbar.ejs   <-- Sliding search panel
│   │   ├── cookiebar.ejs   <-- Cookie notification bar
│   │   └── footer.ejs      <-- Footer + scripts
│   ├── index.ejs           <-- Dashboard/homepage
│   ├── settings.ejs        <-- App settings UI
│   └── 📁 tools/
│       ├── sla-calculator.ejs  <-- SLA Calculator tool screen
│       ├── ip-lookup.ejs       <-- IP lookup UI
│       └── password-generator.ejs <-- Password generator screen

├── 📁 routes/              <-- Express route definitions
│   ├── index.js            <-- Root route handler
│   └── 📁 tools/
│       ├── sla-calculator.js  <-- SLA API route
│       ├── ip-lookup.js       <-- IP tool route
│       └── password-generator.js <-- Password tool route

├── 📁 settings/
│   └── settings.json       <-- Theme and UI preferences

├── app.js                 <-- Main Express server setup
├── package.json           <-- NPM scripts and dependencies
├── package-lock.json      <-- Exact package versions
├── .gitignore             <-- Git ignored files/folders
├── LICENSE                <-- Project license (e.g., MIT)
└── README.md              <-- Project structure and usage info

