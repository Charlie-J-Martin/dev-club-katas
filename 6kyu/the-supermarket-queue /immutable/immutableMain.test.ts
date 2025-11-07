import {
    calculateQueueTimes,
} from './immutableMain';

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
