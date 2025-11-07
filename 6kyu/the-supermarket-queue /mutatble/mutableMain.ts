import { calculateTotalProcessingTime, findTillWithLeastTime, initialiseTills } from '../main';
import { Customers, NumberOfTills, TillTimes } from '../types';
import { validateInputs } from '../utils';


const assignCustomersToTill = (tillQueueTimes: TillTimes, customers: Customers): void => {
    for (const customerTime of customers) {
        const leastBusyTillIndex = findTillWithLeastTime(tillQueueTimes);
        tillQueueTimes[leastBusyTillIndex] += customerTime;
        // All the mutation happens in here - completely hidden from caller!
    }
};

export const calculateQueueTimes = (customers: Customers, numberOfTills: NumberOfTills) => {
    validateInputs(customers, numberOfTills);
    if (customers.length === 0) {
        return 0;
    }

    const tillQueueTimes = initialiseTills(numberOfTills);
    assignCustomersToTill(tillQueueTimes, customers);
    
    return calculateTotalProcessingTime(tillQueueTimes);
};
