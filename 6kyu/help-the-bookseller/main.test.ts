import {
    generateStockList,
    calculateCategoryCounts,
    printCategoryCounts,
    Books,
    Categories,
    CategoryCounts,
} from './main';

describe('stockList', () => {
    test('returns correct totals for categories A–D', () => {
        const books = ['BBAR 150', 'CDXE 515', 'BKWR 250', 'BTSQ 890', 'DRTY 600'];
        const categories = ['A', 'B', 'C', 'D'];

        expect(generateStockList(books, categories)).toBe('(A : 0) - (B : 1290) - (C : 515) - (D : 600)');
    });

    test('returns correct totals for categories A and B only', () => {
        const books = ['ABAR 200', 'CDXE 500', 'BKWR 250', 'BTSQ 890', 'DRTY 600'];
        const categories = ['A', 'B'];

        expect(generateStockList(books, categories)).toBe('(A : 200) - (B : 1140)');
    });

    test('empty books yields zeroes for requested categories', () => {
        const books: string[] = [];
        const categories = ['A', 'B'];
        expect(generateStockList(books, categories)).toBe('(A : 0) - (B : 0)');
    });

    test('unknown category letters still appear with zero', () => {
        const books = ['ABAR 200'];
        const categories = ['Z'];
        expect(generateStockList(books, categories)).toBe('(Z : 0)');
    });

    test('ignores malformed entries gracefully', () => {
        const books = ['ABAR 200', 'BAD', 'CDXE x10'];
        const categories = ['A', 'C'];
        expect(generateStockList(books, categories)).toBe('(A : 200) - (C : 0)');
    });
});

describe('calculateCategoryCounts', () => {
    test('should calculate counts for single category', () => {
        const books: Books = ['ABART 20', 'ACODE 30'];
        const expected: CategoryCounts = { A: 50 };

        expect(calculateCategoryCounts(books)).toEqual(expected);
    });

    test('should calculate counts for multiple categories', () => {
        const books: Books = ['ABART 20', 'BCODE 15', 'CDEF 10', 'AXYZ 25'];
        const expected: CategoryCounts = { A: 45, B: 15, C: 10 };

        expect(calculateCategoryCounts(books)).toEqual(expected);
    });

    test('should handle empty books array', () => {
        const books: Books = [];
        const expected: CategoryCounts = {};

        expect(calculateCategoryCounts(books)).toEqual(expected);
    });

    test('should handle books with zero quantities', () => {
        const books: Books = ['ABART 0', 'BCODE 10'];
        const expected: CategoryCounts = { A: 0, B: 10 };

        expect(calculateCategoryCounts(books)).toEqual(expected);
    });

    test('should accumulate quantities for same category', () => {
        const books: Books = ['ABART 20', 'ACODE 30', 'AXYZ 15'];
        const expected: CategoryCounts = { A: 65 };

        expect(calculateCategoryCounts(books)).toEqual(expected);
    });

    test('should handle single digit and multi-digit quantities', () => {
        const books: Books = ['ABART 5', 'BCODE 150', 'CDEF 7'];
        const expected: CategoryCounts = { A: 5, B: 150, C: 7 };

        expect(calculateCategoryCounts(books)).toEqual(expected);
    });

    test('should handle mixed case categories', () => {
        const books: Books = ['abart 20', 'BCODE 30', 'Cdef 10'];
        const expected: CategoryCounts = { a: 20, B: 30, C: 10 };

        expect(calculateCategoryCounts(books)).toEqual(expected);
    });

    test('should handle special character categories', () => {
        const books: Books = ['1ABC 20', '$DEF 30', '_GHI 15'];
        const expected: CategoryCounts = { '1': 20, $: 30, _: 15 };

        expect(calculateCategoryCounts(books)).toEqual(expected);
    });
});

describe('printCategoryCounts', () => {
    test('should format single category with count', () => {
        const categoryCounts: CategoryCounts = { A: 50 };
        const categories: Categories = ['A'];
        const expected = '(A : 50)';

        expect(printCategoryCounts(categoryCounts, categories)).toBe(expected);
    });

    test('should format multiple categories with counts', () => {
        const categoryCounts: CategoryCounts = { A: 50, B: 120, C: 30 };
        const categories: Categories = ['A', 'B', 'C'];
        const expected = '(A : 50) - (B : 120) - (C : 30)';

        expect(printCategoryCounts(categoryCounts, categories)).toBe(expected);
    });

    test('should show 0 for categories not in categoryCounts', () => {
        const categoryCounts: CategoryCounts = { A: 50 };
        const categories: Categories = ['A', 'B', 'C'];
        const expected = '(A : 50) - (B : 0) - (C : 0)';

        expect(printCategoryCounts(categoryCounts, categories)).toBe(expected);
    });

    test('should handle empty categories array', () => {
        const categoryCounts: CategoryCounts = { A: 50, B: 30 };
        const categories: Categories = [];
        const expected = '';

        expect(printCategoryCounts(categoryCounts, categories)).toBe(expected);
    });

    test('should handle empty categoryCounts object', () => {
        const categoryCounts: CategoryCounts = {};
        const categories: Categories = ['A', 'B', 'C'];
        const expected = '(A : 0) - (B : 0) - (C : 0)';

        expect(printCategoryCounts(categoryCounts, categories)).toBe(expected);
    });

    test('should handle zero counts', () => {
        const categoryCounts: CategoryCounts = { A: 0, B: 25, C: 0 };
        const categories: Categories = ['A', 'B', 'C'];
        const expected = '(A : 0) - (B : 25) - (C : 0)';

        expect(printCategoryCounts(categoryCounts, categories)).toBe(expected);
    });

    test('should maintain order of categories array', () => {
        const categoryCounts: CategoryCounts = { A: 10, B: 20, C: 30 };
        const categories: Categories = ['C', 'A', 'B'];
        const expected = '(C : 30) - (A : 10) - (B : 20)';

        expect(printCategoryCounts(categoryCounts, categories)).toBe(expected);
    });

    test('should handle single character and special categories', () => {
        const categoryCounts: CategoryCounts = { '1': 15, $: 25 };
        const categories: Categories = ['1', '$', 'Z'];
        const expected = '(1 : 15) - ($ : 25) - (Z : 0)';

        expect(printCategoryCounts(categoryCounts, categories)).toBe(expected);
    });

    test('should handle large numbers', () => {
        const categoryCounts: CategoryCounts = { A: 1000, B: 999999 };
        const categories: Categories = ['A', 'B'];
        const expected = '(A : 1000) - (B : 999999)';

        expect(printCategoryCounts(categoryCounts, categories)).toBe(expected);
    });
});
