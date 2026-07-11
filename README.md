# Oxford English Higher Secondary School Portal
> *Education For A Better Life • Kailaras, India*

Welcome to the official, next-generation web portal for **Oxford English Higher Secondary School, Kailaras**. Designed for parents, students, teachers, and prospective admissions, this platform offers a comprehensive, highly interactive digital campus experience.

---

## 🌟 Core Features

-   **Interactive Home & Campus Tour**: A modern, animated hero section paired with structured campus highlights, school facilities, and vision boards.
-   **Academics Section**: Comprehensive stream breakdowns (Science, Commerce, Humanities) alongside curriculum strengths, STEM & Robotics highlights, and key academic statistics.
-   **Online Admissions Portal**: An integrated enrollment workspace allowing prospective parents to complete admissions paperwork, request tours, and calculate estimated tuition fees dynamically.
-   **AI Virtual Admissions Counselor**: A server-side conversational AI assistant built with Google Gemini, trained to answer queries regarding admissions, policies, curriculum, and campus life instantly.
-   **Campus Event Calendar**: An interactive calendar showcasing school events, exam schedules, sports meets, and parent-teacher conferences.
-   **Notice Board**: Live-updating announcements, circulars, and latest alerts from the school administration.
-   **Responsive & Animated Layout**: Fully fluid grid designs, built desktop-first but optimized for touch interfaces using modern spring and stagger animations.

---

## 🛠️ Technology Stack

-   **Frontend**: React (v19) + TypeScript + Vite (v6)
-   **Backend**: Node.js + Express (v4)
-   **Styling**: Tailwind CSS (v4) with custom typography (Inter & Playfair Display)
-   **Animations**: Motion (`motion/react`)
-   **Icons**: Lucide React
-   **AI Engine**: Google Gemini API via official `@google/genai` server-side SDK

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/) (installed with Node.js)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/oxford-school-portal.git
    cd oxford-school-portal
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory by copying `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Open `.env` and fill in your custom credentials:
    ```env
    # Required for the AI counselor to function
    GEMINI_API_KEY="your-gemini-api-key"
    
    # Optional URL of your hosted environment
    APP_URL="http://localhost:3000"
    ```

### Development Mode

Run both the Express server and the Vite dev pipeline concurrently:
```bash
npm run dev
```
The server will start on [http://localhost:3000](http://localhost:3000).

---

## 📦 Production Deployment

### Build

Compile both the React single-page application and the Express server for production:
```bash
npm run build
```
This script:
1.  Builds the static frontend assets via Vite and outputs them to `dist/`.
2.  Bundles the Express `server.ts` entry point into a compiled CommonJS bundle at `dist/server.cjs` using `esbuild`.

### Run

Start the production server:
```bash
npm run start
```
The application will serve static files from `dist/` and expose backend APIs on port `3000`.

---

## 📂 Project Structure

```text
├── public/                 # Static assets (logo, favicon)
├── src/
│   ├── components/         # Highly modular React UI components
│   │   ├── AICounselor.tsx      # AI Admissions Counselor interface
│   │   ├── AboutSection.tsx     # Campus information and interactive map
│   │   ├── Admissions.tsx       # Enrollment workflow & tuition calculator
│   │   ├── Announcements.tsx    # Scrollable Notice Board component
│   │   ├── EventsCalendar.tsx   # Interactive campus events calendar
│   │   ├── Navbar.tsx           # Floating navigation bar with active indicators
│   │   └── ...
│   ├── App.tsx             # Main application layout & scroll-tracking logic
│   ├── index.css           # Global Tailwind stylesheet and theme setup
│   └── main.tsx            # React application entry point
├── server.ts               # Express full-stack API server & static file host
├── package.json            # Scripts & project dependencies
├── vite.config.ts          # Vite build and server configurations
└── README.md               # Documentation
```

---

## 📜 License

This project is configured and customized for the exclusive use of **Oxford English Higher Secondary School, Kailaras**. All rights reserved.
