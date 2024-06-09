import React, {useCallback, useEffect} from 'react';
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';
import useQuote from './hooks/useQuote';
import axios from 'axios';

const fetchQuote = async () => {
    const result = await axios.get('https://api.quotable.io/random');
    return ({
        content: result.data.content,
        author: result.data.author,
    });
};

const App = () => {
    const {quoteData, status, error, onResolve, onReject} = useQuote(fetchQuote);
    const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);

    const handleAddGuessedLetter = useCallback((letter: string) => {
        if (!quoteData || guessedLetters.includes(letter)) return;
        setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    }, [guessedLetters, quoteData]);

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (key === 'enter') {
            setGuessedLetters([]);
            fetchQuote().then(onResolve).catch(onReject);
        } else if (key >= 'a' && key <= 'z') {
            handleAddGuessedLetter(key);
        }
    }, [handleAddGuessedLetter, onResolve, onReject]);

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleKeyPress]);

    if (status === 'pending') return <div>Loading...</div>;
    if (status === 'error') return <div>Error: {error?.message}</div>;

    const wordToGuess = quoteData?.content ?? '';
    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess.split("").filter(char => char.match(/[a-z]/i)).every(letter => guessedLetters.includes(letter));

    return (
        <div className="max-w-[1300px] flex flex-col gap-8 m-auto items-center p-10">
            <div className={`text-5xl text-center ${isWinner ? 'text-green-500' : isLoser ? 'text-red-500' : ''}`}>
                {isWinner && "Winner! - Press 'Enter' to try again"}
                {isLoser && "You Lost - Press 'Enter' to try again"}
            </div>
            <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
            <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} revealWord={isLoser}
                         isWinner={isWinner}/>
            <Keyboard
                disabled={isLoser || isWinner}
                activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
                inactiveLetters={incorrectLetters}
                addGuessedLetter={handleAddGuessedLetter}
            />
        </div>
    );
};

export default App;
