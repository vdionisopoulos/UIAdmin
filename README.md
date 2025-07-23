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

