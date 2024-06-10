import {useState} from 'react';
import {useAppDispatch} from '../store/hooks';
import {setUsername} from '../store/userSlice';

const WelcomeScreen = ({onStartGame}: { onStartGame: () => void }) => {
    const [username, setUsernameState] = useState('');
    const dispatch = useAppDispatch();

    const handleStartGame = () => {
        if (username.trim() !== '') {
            dispatch(setUsername(username));
            onStartGame();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl mb-8">Welcome to Hangman Game</h1>
            <form onSubmit={handleStartGame} className="flex flex-col items-start">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsernameState(e.target.value)}
                    placeholder="Enter your username"
                    className="p-2 border rounded mb-4"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded mx-auto"
                >
                    Start Game
                </button>
            </form>
        </div>
    );
};

export default WelcomeScreen;
