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
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
            gap: ".5rem",
            alignSelf: "stretch"
        }}>
            {KEYS.map((key, index) => (
                <button key={index} style={{
                    fontSize: "1.5rem",
                    padding: ".5rem",
                    border: "none",
                    background: "lightgray",
                    borderRadius: ".5rem"
                }}>{key}</button>
            ))}
        </div>
    );
}

export default Keyboard;