import {useCallback, useEffect, useMemo, useState} from 'react';
import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmanWord';
import Keyboard from './components/Keyboard';
import {addGuessedLetter, fetchWord, resetGame, setEndTime} from './store/hangmanSlice';
import {fetchHighscores, submitHighscore} from './store/highscoreSlice';
import {useAppDispatch, useAppSelector} from './store/hooks';
import WelcomeScreen from './components/WelcomeScreen';
import HighscoreTable from './components/HighscoreTable';

const MAX_ATTEMPTS = 6;

const App = () => {
    const dispatch = useAppDispatch();
    const {
        wordToGuess,
        guessedLetters,
        loading,
        error,
        startTime,
        endTime,
        errors,
        quoteId,
        quoteLength,
    } = useAppSelector((state) => state.hangman);
    const username = useAppSelector((state) => state.user.username);

    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [showHighscoreButton, setShowHighscoreButton] = useState(false);
    const [showHighscore, setShowHighscore] = useState(false);

    // Fetch a new word when the game starts
    useEffect(() => {
        if (gameStarted) {
            dispatch(fetchWord());
        }
    }, [dispatch, gameStarted]);

    const incorrectLetters = useMemo(
        () => guessedLetters.filter((letter) => !wordToGuess.includes(letter)),
        [guessedLetters, wordToGuess]
    );

    const isLoser = incorrectLetters.length >= MAX_ATTEMPTS;
    const isWinner = useMemo(
        () => wordToGuess.split('').filter((char) => char.match(/[a-z]/i)).every((letter) => guessedLetters.includes(letter)),
        [wordToGuess, guessedLetters]
    );

    // Handle game end logic
    useEffect(() => {
        if (isWinner || isLoser) {
            window.scrollTo(0, 0);
            if (isWinner && startTime !== null) {
                dispatch(setEndTime());
            }
            setGameEnded(true);
        }
    }, [isWinner, isLoser, startTime, dispatch]);

    // Handle highscore submission
    useEffect(() => {
        if (gameEnded && isWinner && endTime !== null && startTime !== null) {
            const duration = endTime - startTime;
            const uniqueCharacters = new Set(wordToGuess.replace(/[^a-z]/gi, '').toLowerCase()).size;
            const highscoreData = {
                quoteId: quoteId!,
                length: quoteLength!,
                uniqueCharacters,
                userName: username,
                errors,
                duration,
            };
            dispatch(submitHighscore(highscoreData)).then(() => {
                setShowHighscoreButton(true);
            });
        }
    }, [gameEnded, isWinner, endTime, dispatch, quoteId, quoteLength, wordToGuess, username, errors, startTime]);

    const handleAddGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isWinner || isLoser) return;
            dispatch(addGuessedLetter(letter));
        },
        [guessedLetters, isWinner, isLoser, dispatch]
    );

    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key === 'enter') {
                dispatch(resetGame());
                dispatch(fetchWord());
                setShowHighscore(false);
                setShowHighscoreButton(false);
                setGameEnded(false);
            } else if (key >= 'a' && key <= 'z' && !isWinner && !isLoser) {
                handleAddGuessedLetter(key);
            }
        },
        [dispatch, handleAddGuessedLetter, isWinner, isLoser]
    );

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);
        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleKeyPress]);

    const handleRestart = useCallback(() => {
        dispatch(resetGame());
        dispatch(fetchWord());
        setShowHighscore(false);
        setShowHighscoreButton(false);
        setGameEnded(false);
    }, [dispatch]);

    const handleShowHighscore = useCallback(() => {
        dispatch(fetchHighscores()).then(() => {
            setShowHighscore(true);
        });
    }, [dispatch]);

    if (!gameStarted) {
        return <WelcomeScreen onStartGame={() => setGameStarted(true)}/>;
    }

    if (showHighscore) {
        return (
            <div className="max-w-[1300px] flex flex-col gap-8 m-auto items-center p-10">
                <Header username={username} onRestart={handleRestart}/>
                <HighscoreTable/>
            </div>
        );
    }

    return (
        <div className="max-w-[1300px] flex flex-col gap-8 m-auto items-center p-10">
            <Header username={username} onRestart={handleRestart}/>
            {isWinner && showHighscoreButton && (
                <button onClick={handleShowHighscore} className="mt-4 p-2 bg-blue-500 text-white rounded">
                    See Highscores
                </button>
            )}
            <div className="text-xl">Attempts left: {MAX_ATTEMPTS - incorrectLetters.length}</div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
                <>
                    <ResultMessage isWinner={isWinner} isLoser={isLoser}/>
                    <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
                    <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} revealWord={isLoser}
                                 isWinner={isWinner}/>
                    <Keyboard disabled={isLoser || isWinner}
                              activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
                              inactiveLetters={incorrectLetters} addGuessedLetter={handleAddGuessedLetter}/>
                </>
            )}
        </div>
    );
};

const Header = ({username, onRestart}: { username: string; onRestart: () => void }) => (
    <div className="flex justify-between items-center w-full">
        <div className="text-2xl mb-4">Welcome, {username}!</div>
        <button onClick={onRestart} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Restart Game
        </button>
    </div>
);

const ResultMessage = ({isWinner, isLoser}: { isWinner: boolean; isLoser: boolean }) => (
    <div className={`text-5xl text-center ${isWinner ? 'text-green-500' : isLoser ? 'text-red-500' : ''}`}>
        {isWinner && "Winner! - Press 'Enter' to try again"}
        {isLoser && "You Lost - Press 'Enter' to try again"}
    </div>
);

export default App;
