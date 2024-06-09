import {useEffect} from 'react';
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';
import {addGuessedLetter, fetchWord, resetGame} from './store/hangmanSlice';
import {useAppDispatch, useAppSelector} from './store/hooks';

const App = () => {
    const dispatch = useAppDispatch();
    const {wordToGuess, guessedLetters, loading, error} = useAppSelector((state) => state.hangman);

    useEffect(() => {
        dispatch(fetchWord());
    }, [dispatch]);

    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;

    const isWinner = wordToGuess.split("").filter(char => char.match(/[a-z]/i)).every(letter => guessedLetters.includes(letter));

    useEffect(() => {
        if (isWinner) {
            window.scrollTo(0, 0);
        }
    }, [isWinner]);

    const handleAddGuessedLetter = (letter: string) => {
        if (guessedLetters.includes(letter) || isWinner || isLoser) return;
        dispatch(addGuessedLetter(letter));
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (key === 'enter') {
            dispatch(resetGame());
            dispatch(fetchWord());
        } else if (key >= 'a' && key <= 'z' && !isWinner && !isLoser) {
            handleAddGuessedLetter(key);
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [guessedLetters, isWinner, isLoser]);

    return (
        <div className="max-w-[1300px] flex flex-col gap-8 m-auto items-center p-10">
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
                <>
                    <div
                        className={`text-5xl text-center ${isWinner ? 'text-green-500' : isLoser ? 'text-red-500' : ''}`}>
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
                </>
            )}
        </div>
    );
};

export default App;
