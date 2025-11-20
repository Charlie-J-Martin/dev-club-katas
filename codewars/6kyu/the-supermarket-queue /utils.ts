export const validateInputs = (customers: number[], numberOfTills: number): void => {
    if (numberOfTills <= 0 || !Number.isInteger(numberOfTills)) {
        throw new Error('Number of tills must be a positive integer');
    }
    if (customers.some(time => time < 0)) {
        throw new Error('Customer times must be non-negative');
    }
};