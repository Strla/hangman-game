import {useState} from "react";
import words from "./wordList.json"
import HangmanDrawing from "./HangmanDrawing.tsx";
import HangmanWord from "./HangmanWord.tsx";
import Keyboard from "./Keyboard.tsx";

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>(() => {
        return words[Math.floor(Math.random() * words.length)]
    })

    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    console.log(wordToGuess)
    return (
        <div className="max-w-xl flex flex-col space-y-8 m-auto items-center">
            <div className="text-5xl text-center">Lose Win</div>
            <HangmanDrawing/>
            <HangmanWord/>
            <Keyboard/>
        </div>
    )
}

export default App
