import {useMemo} from 'react';

type HangmanWordProps = {
    wordToGuess: string;
    guessedLetters: string[];
    revealWord?: boolean;
    isWinner?: boolean;
};

const HangmanWord = ({guessedLetters, wordToGuess, revealWord = false, isWinner = false}: HangmanWordProps) => {
    const letters = useMemo(() => {
        return wordToGuess.split("").map((letter, index) => {
            const isGuessed = guessedLetters.includes(letter);
            const isLetter = letter.match(/[a-z]/i);
            const letterClasses = isLetter
                ? isWinner ? "text-green-500" : (!isGuessed && revealWord ? "text-red-500" : "text-black")
                : "text-black";
            const visibilityClasses = isGuessed || revealWord || !isLetter ? "visible" : "invisible";

            return (
                <span className="border-b-[0.1em] border-black" key={index}>
                    <span className={`${visibilityClasses} ${letterClasses}`}>{letter}</span>
                </span>
            );
        });
    }, [guessedLetters, wordToGuess, revealWord, isWinner]);

    return (
        <div className="flex flex-wrap gap-[0.25em] text-6xl font-bold uppercase font-mono">
            {letters}
        </div>
    );
};

export default HangmanWord;
