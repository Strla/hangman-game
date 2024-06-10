import {useAppSelector} from '../store/hooks';
import {RootState} from "../store";

interface Highscore {
    userName: string;
    score: number;
}

const HighscoreTable = () => {
    const {highscores, loading, error} = useAppSelector((state: RootState) => state.highscore);

    if (loading) {
        return <div>Loading high scores...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2 className="text-2xl mb-4">High Scores</h2>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">User Name</th>
                    <th className="px-4 py-2">Score</th>
                </tr>
                </thead>
                <tbody>
                {highscores.map((highscore: Highscore, index: number) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{highscore.userName}</td>
                        <td className="border px-4 py-2">{highscore.score.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HighscoreTable;
