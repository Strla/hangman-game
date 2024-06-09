import BodyPart from "./BodyPart.tsx";

const headClass = "w-70 h-70 rounded-full border-10 border-black absolute top-50 -right-30";
const bodyClass = "w-2.5 h-100 bg-black absolute top-120 right-0";
const rightArmClass = "w-100 h-2.5 bg-black absolute top-150 -right-100 -rotate-30 origin-bottom-left";
const leftArmClass = "w-100 h-2.5 bg-black absolute top-150 right-2.5 rotate-30 origin-bottom-right";
const rightLegClass = "w-100 h-2.5 bg-black absolute top-210 -right-90 rotate-60 origin-bottom-left";
const leftLegClass = "w-100 h-2.5 bg-black absolute top-210 right-0 -rotate-60 origin-bottom-right";

const bodyPartsClasses = [headClass, bodyClass, rightArmClass, leftArmClass, rightLegClass, leftLegClass];


type HangmanDrawingProps = {
    numberOfGuesses: number
}

const StaticParts = () => (
    <>
        <div className="h-50 w-2.5 bg-black absolute top-0 right-0"></div>
        <div className="h-2.5 w-200 bg-black ml-120"></div>
        <div className="h-400 w-2.5 bg-black ml-120"></div>
        <div className="h-2.5 w-250 bg-black"></div>
    </>
);

const HangmanDrawing = ({numberOfGuesses}: HangmanDrawingProps) => {
    return (
        <div className="relative">
            {bodyPartsClasses.slice(0, numberOfGuesses).map((className, index) => (
                <BodyPart key={index} className={className}/>
            ))}
            <StaticParts/>
        </div>
    );
};

export default HangmanDrawing;