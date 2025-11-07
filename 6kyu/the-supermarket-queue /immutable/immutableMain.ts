import { calculateTotalProcessingTime, findTillWithLeastTime, initialiseTills } from '../main';
import { Customers, NumberOfTills } from '../types';
import { validateInputs } from '../utils';

export const calculateQueueTimes = (customers: Customers, numberOfTills: NumberOfTills) => {
    validateInputs(customers, numberOfTills);
    if (customers.length === 0) return 0;

    const finalTillTimes = customers.reduce((tillTimes, customerTime) => {
        const leastBusyTillIndex = findTillWithLeastTime(tillTimes);
        const newTillTimes = [...tillTimes];
        newTillTimes[leastBusyTillIndex] += customerTime;
        return newTillTimes;
    }, initialiseTills(numberOfTills));

    return calculateTotalProcessingTime(finalTillTimes);
};
