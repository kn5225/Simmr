# Simmr

A full-stack recipe web app that lets you search for recipes, build an ingredient cart, and walk through step-by-step cooking instructions with automatic timers. Built as a portfolio project to demonstrate full-stack web development from scratch.

**Live demo:** coming soon

---

## Features

- Recipe search powered by the Spoonacular API
- Ingredient cart with one-click add and remove
- Stripe-powered checkout for ingredient orders (test mode)
- Step-by-step cooking mode with auto-detected timers
- Pantry tracker to avoid buying ingredients you already have

*(Cooking mode, pantry, and Stripe in active development)*

---

## Tech Stack

**Frontend:** React, Vite

**Backend:** Node.js, Express

**APIs:** Spoonacular, Stripe

**Database:** MongoDB Atlas *(coming soon)*

**Deployment:** Vercel (frontend), Railway (backend)

---

## Running Locally

You'll need Node.js 18+ and a Spoonacular API key.

```bash
git clone https://github.com/kn5225/Simmr.git
cd Simmr
npm install
cd client && npm install
cd ../server && npm install
```

Create a `.env` file in `server/` using `.env.example` as a reference, then from the root run:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file in `server/` with the following:

```
SPOONACULAR_API_KEY=your_key_here
STRIPE_SECRET_KEY=your_key_here
```

See `.env.example` for reference.

---

## Project Structure

```
Simmr/
  client/       # React frontend (Vite)
  server/       # Node.js + Express backend
  package.json  # Root package.json with concurrently dev script
```

---

## Development Notes

<details>
<summary>About this project</summary>

Every line of code in this project was written by hand without AI code generation. I used AI as a learning tool to understand concepts, get pointed toward the right resources, and have my code reviewed for bugs, but never to generate the code itself.

I'm a CE student building this to genuinely understand full-stack development rather than just ship something that works without knowing why. It took longer. That was the point.

</details>
