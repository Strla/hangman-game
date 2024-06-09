const Keyboard = () => {
    const KEYS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ]
    return (
        <div className="grid grid-cols-custom gap-2 self-stretch">
            {KEYS.map((key, index) => (
                <button key={index} className="text-custom-xl p-2 border-none bg-gray-300 rounded-custom">
                    {key}
                </button>
            ))}
        </div>
    );
}

export default Keyboard;