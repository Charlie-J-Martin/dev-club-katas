type RawAddresses = string;
type Address = string;
type Zipcode = string;
type AddressParts = {
    houseNumber: string;
    streetAndTown: string;
};

export const travel = (rawAddresses: RawAddresses, zipcode: Zipcode): string => {
    if (!zipcode) return ':/';
    if (!rawAddresses) return `${zipcode}:/`;

    const addressParts: AddressParts[] = rawAddresses
        .split(',')
        .filter((address) => addressHasZipCode(address, zipcode))
        .map((address) => extractAddressParts(address, zipcode));

    if (addressParts.length === 0) {
        return `${zipcode}:/`;
    }

    const houseNumbers = addressParts.map((addressPart) => addressPart.houseNumber).join(',');
    const streets = addressParts.map((addressPart) => addressPart.streetAndTown).join(',');

    return `${zipcode}:${streets}/${houseNumbers}`;
};

export const addressHasZipCode = (address: Address, zipcode: Zipcode): boolean => {
    return address.endsWith(zipcode);
};

export const extractAddressParts = (address: Address, zipcode: Zipcode): AddressParts => {
    const addressWithoutZip = address.slice(0, -zipcode.length).trim();
    const parts = addressWithoutZip.split(' ');

    const houseNumber = parts[0];
    const streetAndTown = parts.slice(1).join(' ');

    return { houseNumber, streetAndTown };
};
