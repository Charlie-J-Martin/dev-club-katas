import { Customers, NumberOfTills, TillTimes } from './types';
import { validateInputs } from './utils';

export const initialiseTills = (numberOfTills: NumberOfTills) => {
    return Array(numberOfTills).fill(0);
};

export const findTillWithLeastTime = (tills: TillTimes) => {
    return tills.indexOf(Math.min(...tills));
};

export const calculateTotalProcessingTime = (tills: TillTimes) => {
    return Math.max(...tills);
};

export const calculateQueueTimes = (customers: Customers, numberOfTills: NumberOfTills) => {
    validateInputs(customers, numberOfTills);
    if (customers.length === 0) {
        return 0;
    }

    const tillQueueTimes = initialiseTills(numberOfTills);

    for (const customerTime of customers) {
        const leastBusyTillIndex = findTillWithLeastTime(tillQueueTimes);
        tillQueueTimes[leastBusyTillIndex] += customerTime;
    }

    return calculateTotalProcessingTime(tillQueueTimes);
};
