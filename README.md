# Hangman Game

This is a Hangman game built with React and Redux. The game fetches a random quote and allows the user to guess letters
to uncover the hidden quote.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Strla/hangman-game.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd hangman-game
    ```

3. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

    ```bash
    npm install
    ```

## Running the App

Once the dependencies are installed, you can run the app locally:

1. **Start the development server:**

    ```bash
    npm run dev
    ```

2. Open your web browser and go to [http://localhost:5173](http://localhost:5173) to see the app running.

## Project Structure

Here's an overview of the project's structure:

 ```bash
hangman-game/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── HangmanDrawing.tsx
│   │   ├── HangmanWord.tsx
│   │   ├── Keyboard.tsx
│   │   └── ...
│   ├── hooks/
│   │   └── useQuote.ts
│   ├── store/
│   │   ├── hangmanSlice.ts
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── package.json
├── tsconfig.json
└── README.md
```

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **Vite**: A fast build tool and development server for modern web projects.

## Contributing

If you wish to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.
