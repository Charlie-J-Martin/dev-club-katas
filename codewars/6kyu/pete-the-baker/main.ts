export type Ingredients = Record<string, number>;

export const cakes = (recipe: Ingredients, available: Ingredients): number => {
    const ingredientCapacity: number[] = [];

    for (const ingredient in recipe) {
        const required = recipe[ingredient];
        const stock = available[ingredient] ?? 0;

        const cakeCapacity = Math.floor(stock / required);

        ingredientCapacity.push(cakeCapacity);
    }

    return Math.min(...ingredientCapacity);
};
