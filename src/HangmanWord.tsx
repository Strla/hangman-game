type HangmanWordProps = {
    wordToGuess: string;
    guessedLetters: string[];
    revealWord?: boolean;
}

const HangmanWord = ({guessedLetters, wordToGuess, revealWord = false}: HangmanWordProps) => {

    return (
        <div className="flex gap-[0.25em] text-6xl font-bold uppercase font-mono">
            {wordToGuess.split("").map((letter, index) => {
                const letterClasses = `${!guessedLetters.includes(letter) && revealWord ? "text-red-500" : "text-black"}`;
                return (
                    <span className="border-b-[0.1em] border-black" key={index}>
                        <span
                            className={`${guessedLetters.includes(letter) || revealWord ? "visible" : "invisible"} ${letterClasses}`}>{letter}</span>
                    </span>
                )
            })}
        </div>
    )
}

export default HangmanWord;