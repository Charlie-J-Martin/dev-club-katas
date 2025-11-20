import { validateInputs } from './utils';

describe('validateInputs', () => {
    test('should not throw for valid inputs', () => {
        expect(() => validateInputs([1, 2, 3], 2)).not.toThrow();
        expect(() => validateInputs([0, 5, 10], 1)).not.toThrow();
        expect(() => validateInputs([], 3)).not.toThrow();
        expect(() => validateInputs([1], 10)).not.toThrow();
    });

    test('should throw error for invalid number of tills', () => {
        expect(() => validateInputs([1, 2, 3], 0)).toThrow(
            'Number of tills must be a positive integer'
        );

        expect(() => validateInputs([1, 2, 3], -1)).toThrow(
            'Number of tills must be a positive integer'
        );

        expect(() => validateInputs([1, 2, 3], -5)).toThrow(
            'Number of tills must be a positive integer'
        );
    });

    test('should throw error for non-integer number of tills', () => {
        expect(() => validateInputs([1, 2, 3], 2.5)).toThrow(
            'Number of tills must be a positive integer'
        );

        expect(() => validateInputs([1, 2, 3], 1.1)).toThrow(
            'Number of tills must be a positive integer'
        );

        expect(() => validateInputs([1, 2, 3], Math.PI)).toThrow(
            'Number of tills must be a positive integer'
        );
    });

    test('should throw error for negative customer times', () => {
        expect(() => validateInputs([-1, 2, 3], 2)).toThrow('Customer times must be non-negative');

        expect(() => validateInputs([1, -5, 3], 2)).toThrow('Customer times must be non-negative');

        expect(() => validateInputs([1, 2, -1], 2)).toThrow('Customer times must be non-negative');
    });

    test('should throw error for multiple negative customer times', () => {
        expect(() => validateInputs([-1, -2, -3], 2)).toThrow(
            'Customer times must be non-negative'
        );

        expect(() => validateInputs([-5, 10, -1], 1)).toThrow(
            'Customer times must be non-negative'
        );
    });

    test('should handle edge cases with zero values', () => {
        expect(() => validateInputs([0, 0, 0], 1)).not.toThrow();
        expect(() => validateInputs([0], 1)).not.toThrow();
    });

    test('should handle empty customer array', () => {
        expect(() => validateInputs([], 1)).not.toThrow();
        expect(() => validateInputs([], 5)).not.toThrow();
    });

    test('should handle large valid inputs', () => {
        expect(() => validateInputs([1000, 2000, 500], 10)).not.toThrow();
        expect(() => validateInputs([0, 999999], 100)).not.toThrow();
    });
});
