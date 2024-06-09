const HEAD = (
    <div className="w-70 h-70 rounded-full border-10 border-black absolute top-50 -right-30"></div>
)

const BODY = (
    <div className="w-2.5 h-100 bg-black absolute top-120 right-0"></div>
)

const RIGHT_ARM = (
    <div className="w-100 h-2.5 bg-black absolute top-150 -right-100 -rotate-30 origin-bottom-left"></div>
)

const LEFT_ARM = (
    <div className="w-100 h-2.5 bg-black absolute top-150 right-2.5 rotate-30 origin-bottom-right"></div>
)

const RIGHT_LEG = (
    <div className="w-100 h-2.5 bg-black absolute top-210 -right-90 rotate-60 origin-bottom-left"></div>
)

const LEFT_LEG = (
    <div className="w-100 h-2.5 bg-black absolute top-210 right-0 -rotate-60 origin-bottom-right"></div>
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
    numberOfGuesses: number
}

const HangmanDrawing = ({numberOfGuesses}: HangmanDrawingProps) => {
    return (
        <div className="relative">
            {BODY_PARTS.slice(0, numberOfGuesses).map((bodyPart, index) => (
                <div key={index}>{bodyPart}</div>
            ))}
            <div className="h-50 w-2.5 bg-black absolute top-0 right-0"></div>
            <div className="h-2.5 w-200 bg-black ml-120"></div>
            <div className="h-400 w-2.5 bg-black ml-120"></div>
            <div className="h-2.5 w-250 bg-black"></div>
        </div>
    );
}

export default HangmanDrawing;