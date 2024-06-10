import {calculateScore} from "../src/utils/score";

describe('calculateScore', () => {
    test('fewer errors should result in higher score', () => {
        expect(calculateScore(100, 20, 0, 1000)).toBeGreaterThan(calculateScore(100, 20, 1, 1000));
    });

    test('more unique letters should result in higher score given the same errors', () => {
        expect(calculateScore(100, 20, 1, 1000)).toBeGreaterThan(calculateScore(100, 10, 1, 1000));
    });

    test('longer quotes should result in higher score given the same errors and unique letters', () => {
        expect(calculateScore(200, 20, 1, 1000)).toBeGreaterThan(calculateScore(100, 20, 1, 1000));
    });

    test('faster solutions should result in higher score given the same errors, unique letters, and quote length', () => {
        expect(calculateScore(100, 20, 1, 500)).toBeGreaterThan(calculateScore(100, 20, 1, 1000));
    });

    test('should handle edge cases appropriately', () => {
        expect(() => calculateScore(-1, 20, 1, 1000)).toThrow("Invalid input values");
        expect(() => calculateScore(100, -1, 1, 1000)).toThrow("Invalid input values");
        expect(() => calculateScore(100, 20, -1, 1000)).toThrow("Invalid input values");
        expect(() => calculateScore(100, 20, 1, -1000)).toThrow("Invalid input values");
        expect(() => calculateScore(0, 20, 1, 1000)).toThrow("Invalid input values");
        expect(() => calculateScore(100, 0, 1, 1000)).toThrow("Invalid input values");
    });
});
