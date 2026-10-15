# Dev Stack

Build your ideal development stack by exploring technologies, comparing their categories and difficulty, and adding your choices to a personal stack.

## Preview

A responsive React application inspired by the supplied Dev Stack UI reference.

## Technologies Used

- React 18 and JavaScript (ES6+)
- Vite
- CSS3 with responsive layouts and a shared orange-to-pink-to-violet gradient
- React-Toastify for toast notifications
- Lucide React icons
- JSON data loaded from `public/technologies.json`

## Features

1. Technology explorer:Browse 15 technologies and filter by category.
2. Interactive stack builder: Add and remove technologies, prevent duplicates, and clear the stack.
3. Responsive interface: Sticky desktop navigation, mobile menu, loading and error states, and toast feedback.

## Getting Started

Make sure Node.js (18 or newer recommended) is installed.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Create a production build with:

```bash
npm run build
npm run preview
```

## Deployment

You can deploy the repository to Netlify, Vercel, or Cloudflare Pages. Use `npm run build` as the build command and `dist` as the output directory.

## React Questions

1. What is JSX, and why is it used in React?
JSX is a syntax that lets us write HTML-like markup inside JavaScript. It makes React interfaces easier to read and build.

2. What is the difference between props and state?
Props are values passed from a parent component to a child. State is data a component manages and can update over time.

3. What does the `useState` hook do, and where did you use it in this project?
`useState` stores component data and triggers a re-render when it changes. I used it for the technology list, selected stack, loading status, active category filter, and mobile menu.

4. What does the `useEffect` hook do, and why did you need it to load the JSON data?
`useEffect` runs side effects after rendering. I used it to fetch `technologies.json` when the app loads and to update the loading or error state.

5. Why does every item in a `.map()` list need a unique `key` prop?
A unique key helps React identify which list items changed, were added, or were removed, so it can update the UI correctly.

6. What is conditional rendering? Show one place you used it.
Conditional rendering means showing different UI depending on a condition. The stack panel shows an empty-state message when no technologies are selected, and displays stack items when the stack has items.

7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?
A parent passes data through props. To let a child report an action, the parent passes a callback function as a prop; the child calls that function when needed.

## Submission Links

