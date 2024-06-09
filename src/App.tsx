import {useCallback, useEffect, useMemo, useState} from "react";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import words from "./wordList.json";

const getWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

const App = () => {
    const [wordToGuess, setWordToGuess] = useState<string>(getWord);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = useMemo(() => guessedLetters.filter(letter => !wordToGuess.includes(letter)), [guessedLetters, wordToGuess]);

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

    const addGuessedLetter = useCallback((letter: string) => {
        if (guessedLetters.includes(letter) || isWinner || isLoser) return;
        setGuessedLetters(currentLetters => [...currentLetters, letter]);
    }, [guessedLetters, isWinner, isLoser]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key === "enter") {
                e.preventDefault();
                setGuessedLetters([]);
                setWordToGuess(getWord());
            } else if (key >= "a" && key <= "z" && !isWinner && !isLoser) {
                e.preventDefault();
                addGuessedLetter(key);
            }
        };

        document.addEventListener("keypress", handler);

        return () => {
            document.removeEventListener("keypress", handler);
        };
    }, [addGuessedLetter, isWinner, isLoser]);

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
    );
};

export default App;