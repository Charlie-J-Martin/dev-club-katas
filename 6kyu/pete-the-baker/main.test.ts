import { cakes, Ingredients } from './main';

describe('description example', () => {
    test('passes example tests', () => {
        let recipe: Ingredients = { flour: 500, sugar: 200, eggs: 1 };
        let available: Ingredients = { flour: 1200, sugar: 1200, eggs: 5, milk: 200 };
        expect(cakes(recipe, available)).toBe(2);

        recipe = { apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100 };
        available = { sugar: 500, flour: 2000, milk: 2000 };
        expect(cakes(recipe, available)).toBe(0);
    });
});
