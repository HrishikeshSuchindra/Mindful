🧠 Mindful — A Compassionate AI-Powered Mental Health Companion

“Because everyone deserves to be heard — not analyzed.”
Mindful is an empathetic, privacy-first mental wellbeing web application that combines conversational AI, mood analytics, and therapeutic tools to provide gentle, human-like emotional support anytime, anywhere.

🌿 Overview

Mindful bridges technology and emotional intelligence through:

💬 Empathetic AI Companionship — chat naturally with an AI that listens like a friend, not a therapist.

📊 Mood Tracking & Analytics — track and visualize your emotional patterns.

🧘‍♀️ Evidence-Based CBT Exercises — interactive cognitive behavioral therapy tools for grounding, reflection, and growth.

🚨 Crisis Support Mode — instant access to international helplines and calming techniques.

🔒 Privacy-First Design — your data stays yours, always. No cloud storage, no tracking, full export/delete control.

🏗️ Technical Architecture

Mindful is a full-stack TypeScript web application built with:

Frontend: React + Vite + TypeScript + Framer Motion + shadcn/ui

Backend: Express.js (Node) + TypeScript + Axios + dotenv

Deployment: Frontend on Vercel
 · Backend on Render

AI Models: Anthropic Claude (via OpenRouter API) + Hugging Face Zephyr 7B for fallback

Data Persistence: localStorage (no cloud DB to preserve privacy)

🔁 Application Flow
Welcome → Onboarding → Main Interface (Chat, Dashboard, CBT Tools, Settings)


1️⃣ Welcome Screen
Introduces Mindful’s purpose — empathy, privacy, and personalization — with subtle motion and calm visuals.

2️⃣ Onboarding Flow
Four-step personalization:

Privacy & Consent

Language & Culture

Interaction Style (Text / Voice / Multimodal)

AI Companion Persona (Friendly Peer / Calm Coach / Expert Guide)

3️⃣ Main Interface
Tabbed navigation:

💬 Chat (AI Companion)

📊 Dashboard (Mood Analytics)

🧘 CBT Tools (Therapeutic Exercises)

⚙️ Settings (Privacy & Personalization)

4️⃣ Crisis Mode
Overrides interface to display helplines, safety reminders, and immediate coping exercises.

🤖 Chat System & AI Logic
Emotion Detection

Mindful detects emotions in real-time:

"anxious", "worried" → stressed
"happy", "great" → happy
"sad", "upset" → sad
(default → neutral)

Response Generation

Each persona (Peer / Coach / Expert) adapts tone, empathy, and content.
The AI avoids sterile or robotic phrasing — it speaks like a friend who cares.

Stressed: offers grounding and breathing

Sad: encourages gentle reflection and journaling

Happy: celebrates and reinforces joy

Neutral: opens deeper, curious dialogue

📈 Dashboard & Analytics

Visual insights for emotional awareness:

Mood timeline (Recharts line graph)

Activity correlation (bar chart)

Weekly average & streak tracker

Achievements system (gamified motivation)

Recent entries with emojis and notes

All mood data is saved locally — exportable anytime.

🧠 CBT Tools

Interactive exercises based on clinical psychology:

Tool	Technique	Purpose
💭 Thought Reframing	Cognitive restructuring	Identify and balance negative thoughts
🌬️ Breathing Exercises	4-7-8 & Box Breathing	Reduce anxiety, calm nervous system
👁️ Grounding (5-4-3-2-1)	Sensory awareness	Stabilize in moments of distress
📓 Guided Journaling	Therapeutic reflection	Encourage self-expression & gratitude

Each tool features smooth animations, progress tracking, and empathetic prompts.

🚨 Crisis Support

When things get overwhelming, Mindful offers:

🌍 International helplines (US, UK, Canada, Australia)

🫁 Quick coping tools (grounding, breathing)

🛡️ Safety affirmations & prevention messages

🧩 Clear UI for accessibility and urgency

⚙️ Settings & Privacy

Mindful puts users fully in control:

Change name, AI persona, voice/text mode

Toggle notifications & conversation memory

Export or permanently delete all data

Dark mode, font scaling, and language preferences

WCAG-compliant accessible design

All user data lives only in the browser (via localStorage).
No tracking. No analytics. No cookies.

🧩 Design System

Therapeutic Color Palette:

Color	Meaning
Teal	Calm, relaxation
Blue	Trust, clarity
Green	Growth, balance
Purple	Wisdom, creativity
Orange	Warmth, optimism

Typography: Clean, modern sans-serif with 1.5 line height
Animations: Framer Motion for calm transitions and breathing visualizations
Layout: Rounded corners, soft shadows, and minimal clutter

🧠 Tech Stack Summary
Layer	Technology
Frontend	React, Vite, TypeScript
UI	shadcn/ui, Framer Motion
Backend	Node.js, Express, TypeScript
APIs	OpenRouter (Claude), Hugging Face
Data	localStorage
Charts	Recharts
Deployment	Vercel (frontend), Render (backend)
🔒 Security & Ethics

Fully client-side data storage

No account or login required

API keys secured via .env (never exposed)

Compliant with digital wellbeing & privacy principles

🧭 User Journey Example

1️⃣ New user: Sees welcome → completes onboarding
2️⃣ Starts chat: “I’m feeling anxious today” → AI detects stress → suggests grounding
3️⃣ Goes to CBT Tools: Completes breathing exercise
4️⃣ Logs mood: 6/10 with activity “meditation”
5️⃣ Views progress: Mood trend + streak visualized
6️⃣ Crisis: Switches to crisis mode → sees helplines
7️⃣ Personalizes: Switches persona, changes theme
8️⃣ Returns: App remembers state via localStorage

🚀 Deployment Links

🖥️ Frontend (Vercel): https://mindful-by-hrishi.vercel.app

⚙️ Backend (Render): https://mindful-nw2c.onrender.com

🤝 Contribution & Future Enhancements

Planned roadmap:

🗣️ Voice recognition and emotional tone detection

📲 Mobile app (React Native)

🧩 AI-powered mood prediction and journaling insights

🪄 Multi-language empathetic NLP fine-tuning

Pull requests and research collaborations are welcome!

💚 Philosophy

Mindful isn’t a therapist — it’s a companion.
It doesn’t fix emotions, it sits with them.
Built with empathy, designed for trust, powered by AI — human at heart.

🧑‍💻 Author

Hrishikesh Suchindra
