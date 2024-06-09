const HangmanWord = () => {
    const word = "test"
    const guessedLetters = ["e", "t"]
    return (
        <div className="flex gap-[0.25em] text-6xl font-bold uppercase font-mono">
            {word.split("").map((letter, index) => (
                <span className="border-b-[0.1em] border-black" key={index}>
                    <span className={guessedLetters.includes(letter) ? "visible" : "invisible"}>{letter}</span>
                </span>
            ))}
        </div>
    )
}

export default HangmanWord;