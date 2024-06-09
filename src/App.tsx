import {useCallback, useEffect, useState} from "react";
import HangmanDrawing from "./HangmanDrawing.tsx";
import HangmanWord from "./HangmanWord.tsx";
import Keyboard from "./Keyboard.tsx";
import words from "./wordList.json";

function getWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>(getWord());

    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

    const addGuessedLetter = useCallback((letter: string) => {
        if (guessedLetters.includes(letter) || isWinner || isLoser) return;
        setGuessedLetters(currentLetters => [...currentLetters, letter]);
    }, [guessedLetters, isWinner, isLoser]);


    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (!key.match(/[a-z]/i)) return;

            e.preventDefault()
            addGuessedLetter(key)
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [guessedLetters])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (key !== "Enter") return

            e.preventDefault()
            setGuessedLetters([])
            setWordToGuess(getWord())
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [])


    return (
        <div className="max-w-[1300px] flex flex-col gap-8 m-auto items-center p-10">
            <div className="text-5xl text-center">
                {isWinner && "Winner! - Press 'Enter' to try again"}
                {isLoser && "You Lost - Press 'Enter' to try again"}
            </div>
            <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
            <HangmanWord
                guessedLetters={guessedLetters}
                wordToGuess={wordToGuess}
                revealWord={isLoser}
            />
            <Keyboard
                disabled={isLoser || isWinner}
                activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={addGuessedLetter}
            />
        </div>
    )
}

export default App
