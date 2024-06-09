import {useMemo} from 'react';

type HangmanWordProps = {
    wordToGuess: string;
    guessedLetters: string[];
    revealWord?: boolean;
};

const HangmanWord = ({guessedLetters, wordToGuess, revealWord = false}: HangmanWordProps) => {
    const letters = useMemo(() => {
        return wordToGuess.split("").map((letter, index) => {
            const isGuessed = guessedLetters.includes(letter);
            const letterClasses = !isGuessed && revealWord ? "text-red-500" : "text-black";
            const visibilityClasses = isGuessed || revealWord ? "visible" : "invisible";

            return (
                <span className="border-b-[0.1em] border-black" key={index}>
                    <span className={`${visibilityClasses} ${letterClasses}`}>{letter}</span>
                </span>
            );
        });
    }, [guessedLetters, wordToGuess, revealWord]);

    return (
        <div className="flex gap-[0.25em] text-6xl font-bold uppercase font-mono">
            {letters}
        </div>
    );
};

export default HangmanWord;
