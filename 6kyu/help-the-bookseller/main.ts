export type Books = string[];
export type Categories = string[];
export type CategoryCounts = Record<string, number>;

export const calculateCategoryCounts = (books: Books): CategoryCounts => {
    const categoryCounts: CategoryCounts = {};

    for (const book of books) {
        const [code, quantity] = book.split(' ');
        const category = code[0];
        categoryCounts[category] = (categoryCounts[category] || 0) + Number(quantity);
    }
    return categoryCounts;
};

export const printCategoryCounts = (
    categoryCounts: CategoryCounts,
    categories: Categories
): string =>
    categories.map((category) => `(${category} : ${categoryCounts[category] || 0})`).join(' - ');
    
export const generateStockList = (books: Books, categories: Categories): string => {
    const categoryCounts = calculateCategoryCounts(books);

    return printCategoryCounts(categoryCounts, categories);
};
