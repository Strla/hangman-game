export const calculateScore = (L: number, U: number, E: number, T: number): number => {
    if (E < 0 || T <= 0 || L <= 0 || U <= 0) {
        throw new Error("Invalid input values");
    }

    return ((L * U) / ((E + 1) * T)) * 10000;
};
