import {useCallback, useMemo} from 'react';

type KeyboardProps = {
    activeLetters: string[];
    inactiveLetters: string[];
    addGuessedLetter: (letter: string) => void;
    disabled?: boolean;
};

const Keyboard = ({activeLetters, inactiveLetters, addGuessedLetter, disabled = false}: KeyboardProps) => {
    const KEYS = useMemo(() => [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ], []);

    const getButtonClasses = useCallback((key: string) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);

        return `
            w-full border-[3px] border-black bg-none aspect-square text-2.5rem uppercase p-2 font-bold cursor-pointer text-black active:text-white hover:bg-sky-300
            ${isActive ? 'bg-sky-300 text-white' : ''}
            ${isInactive ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : ''}
        `;
    }, [activeLetters, inactiveLetters]);

    return (
        <div className="grid grid-cols-custom gap-2 self-stretch">
            {KEYS.map((key, index) => (
                <button
                    key={index}
                    onClick={() => addGuessedLetter(key)}
                    className={getButtonClasses(key)}
                    disabled={disabled || activeLetters.includes(key) || inactiveLetters.includes(key)}
                >
                    {key}
                </button>
            ))}
        </div>
    );
};

export default Keyboard;
