import { calculateQueueTimes, calculateTotalProcessingTime, findTillWithLeastTime, initialiseTills } from './main';

describe('initialiseTills', () => {
    test('should create array with correct length filled with zeros', () => {
        expect(initialiseTills(1)).toEqual([0]);
        expect(initialiseTills(2)).toEqual([0, 0]);
        expect(initialiseTills(5)).toEqual([0, 0, 0, 0, 0]);
        expect(initialiseTills(10)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });

    test('should handle zero tills', () => {
        expect(initialiseTills(0)).toEqual([]);
    });

    test('should return new array instances', () => {
        const tills1 = initialiseTills(3);
        const tills2 = initialiseTills(3);
        expect(tills1).not.toBe(tills2);
        expect(tills1).toEqual(tills2);
    });

    test('should create arrays with correct length property', () => {
        expect(initialiseTills(1)).toHaveLength(1);
        expect(initialiseTills(5)).toHaveLength(5);
        expect(initialiseTills(0)).toHaveLength(0);
    });
});

describe('findTillWithLeastTime', () => {
    test('should return index of till with minimum time', () => {
        expect(findTillWithLeastTime([5, 2, 8, 1])).toBe(3);
        expect(findTillWithLeastTime([10, 5, 15])).toBe(1);
        expect(findTillWithLeastTime([3, 7, 2, 9])).toBe(2);
    });

    test('should return first index when all tills have same time', () => {
        expect(findTillWithLeastTime([5, 5, 5])).toBe(0);
        expect(findTillWithLeastTime([0, 0, 0, 0])).toBe(0);
        expect(findTillWithLeastTime([10])).toBe(0);
    });

    test('should return first occurrence when multiple tills have minimum time', () => {
        expect(findTillWithLeastTime([5, 2, 8, 2])).toBe(1);
        expect(findTillWithLeastTime([3, 1, 5, 1, 7])).toBe(1);
        expect(findTillWithLeastTime([0, 5, 0, 3])).toBe(0);
    });

    test('should handle single till', () => {
        expect(findTillWithLeastTime([42])).toBe(0);
        expect(findTillWithLeastTime([0])).toBe(0);
    });

    test('should handle tills with zero times', () => {
        expect(findTillWithLeastTime([0, 5, 3])).toBe(0);
        expect(findTillWithLeastTime([10, 0, 20])).toBe(1);
    });
});

describe('calculateTotalProcessingTime', () => {
    test('should return maximum time from tills array', () => {
        expect(calculateTotalProcessingTime([5, 2, 8, 1])).toBe(8);
        expect(calculateTotalProcessingTime([10, 5, 15])).toBe(15);
        expect(calculateTotalProcessingTime([3, 7, 2, 9])).toBe(9);
    });

    test('should handle single till', () => {
        expect(calculateTotalProcessingTime([42])).toBe(42);
        expect(calculateTotalProcessingTime([0])).toBe(0);
    });

    test('should handle all tills with same time', () => {
        expect(calculateTotalProcessingTime([5, 5, 5])).toBe(5);
        expect(calculateTotalProcessingTime([0, 0, 0, 0])).toBe(0);
        expect(calculateTotalProcessingTime([10, 10])).toBe(10);
    });

    test('should handle zero times', () => {
        expect(calculateTotalProcessingTime([0, 5, 3])).toBe(5);
        expect(calculateTotalProcessingTime([0, 0, 0])).toBe(0);
    });

    test('should handle large numbers', () => {
        expect(calculateTotalProcessingTime([100, 250, 75, 180])).toBe(250);
        expect(calculateTotalProcessingTime([999, 1000, 500])).toBe(1000);
    });
});

describe('calculateQueueTimes', () => {
    test('should return 0 for empty queue and handle basic single/multi-till scenarios', () => {
        expect(calculateQueueTimes([], 1)).toBe(0);
        expect(calculateQueueTimes([1, 2, 3, 4], 1)).toBe(10);
        expect(calculateQueueTimes([2, 2, 3, 3, 4, 4], 2)).toBe(9);
        expect(calculateQueueTimes([1, 2, 3, 4, 5], 100)).toBe(5);
    });

    test('should correctly calculate queue times for common supermarket scenarios', () => {
        expect(calculateQueueTimes([5, 3, 4], 1)).toBe(12);
        expect(calculateQueueTimes([10, 2, 3, 3], 2)).toBe(10);
        expect(calculateQueueTimes([2, 3, 10, 2], 2)).toBe(12);
    });

    test('should handle various customer-to-till ratios efficiently', () => {
        expect(calculateQueueTimes([1, 2, 3, 4, 5], 2)).toBe(9);
        expect(calculateQueueTimes([10, 10, 10], 2)).toBe(20);
        expect(calculateQueueTimes([1, 2, 3, 4], 3)).toBe(5);
        expect(calculateQueueTimes([5, 5, 5, 5], 1)).toBe(20);
    });

    test('should handle edge case where there are more tills than customers', () => {
        expect(calculateQueueTimes([5], 3)).toBe(5);
        expect(calculateQueueTimes([1, 2], 5)).toBe(2);
    });

    test('should correctly process customers with zero processing time', () => {
        expect(calculateQueueTimes([0, 5, 0, 3], 2)).toBe(5);
        expect(calculateQueueTimes([0, 0, 0], 1)).toBe(0);
        expect(calculateQueueTimes([0, 0, 0], 2)).toBe(0);
    });

    test('should handle queues with mixed zero and non-zero processing times', () => {
        expect(calculateQueueTimes([0, 10, 0, 5], 2)).toBe(10);
        expect(calculateQueueTimes([5, 0, 10, 0], 3)).toBe(10);
    });

    test('should handle customers with large processing times without overflow', () => {
        expect(calculateQueueTimes([1000, 2000, 500], 2)).toBe(2000);
        expect(calculateQueueTimes([999, 1, 999], 3)).toBe(999);
    });

    test('should optimally distribute customers to minimize total processing time', () => {
        expect(calculateQueueTimes([1, 1, 1, 1, 1, 1], 3)).toBe(2);
        expect(calculateQueueTimes([3, 1, 4, 1, 5], 3)).toBe(7);
    });
});
