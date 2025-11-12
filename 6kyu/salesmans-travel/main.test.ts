import { addressHasZipCode, extractAddressParts, travel } from './main';

const ad =
    '123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432,' +
    '54 Holy Grail Street Niagara Town ZP 32908,3200 Main Rd. Bern AE 56210,1 Gordon St. Atlanta RE 13000,' +
    '10 Pussy Cat Rd. Chicago EX 34342,10 Gordon St. Atlanta RE 13000,58 Gordon Road Atlanta RE 13000,' +
    '22 Tokyo Av. Tedmondville SW 43098,674 Paris bd. Abbeville AA 45521,10 Surta Alley Goodtown GG 30654,' +
    '45 Holy Grail Al. Niagara Town ZP 32908,320 Main Al. Bern AE 56210,14 Gordon Park Atlanta RE 13000,' +
    '100 Pussy Cat Rd. Chicago EX 34342,2 Gordon St. Atlanta RE 13000,5 Gordon Road Atlanta RE 13000,' +
    '2200 Tokyo Av. Tedmondville SW 43098,67 Paris St. Abbeville AA 45521,11 Surta Avenue Goodtown GG 30654,' +
    '45 Holy Grail Al. Niagara Town ZP 32918,320 Main Al. Bern AE 56215,14 Gordon Park Atlanta RE 13200,' +
    '100 Pussy Cat Rd. Chicago EX 34345,2 Gordon St. Atlanta RE 13222,5 Gordon Road Atlanta RE 13001,' +
    '2200 Tokyo Av. Tedmondville SW 43198,67 Paris St. Abbeville AA 45522,11 Surta Avenue Goodville GG 30655,' +
    '2222 Tokyo Av. Tedmondville SW 43198,670 Paris St. Abbeville AA 45522,114 Surta Avenue Goodville GG 30655,' +
    '2 Holy Grail Street Niagara Town ZP 32908,3 Main Rd. Bern AE 56210,77 Gordon St. Atlanta RE 13000';

describe('travel', () => {
    test('Basic tests', () => {
        expect(travel(ad, 'AA 45522')).toBe(
            'AA 45522:Paris St. Abbeville,Paris St. Abbeville/67,670'
        );
        expect(travel(ad, 'EX 34342')).toBe(
            'EX 34342:Pussy Cat Rd. Chicago,Pussy Cat Rd. Chicago/10,100'
        );
        expect(travel(ad, 'EX 34345')).toBe('EX 34345:Pussy Cat Rd. Chicago/100');
        expect(travel(ad, 'AA 45521')).toBe(
            'AA 45521:Paris bd. Abbeville,Paris St. Abbeville/674,67'
        );
        expect(travel(ad, 'AE 56215')).toBe('AE 56215:Main Al. Bern/320');
        expect(travel(ad, '')).toBe(':/');
    });
});

describe('addressHasZipCode', () => {
    test('returns true when address ends with zipcode', () => {
        expect(addressHasZipCode('123 Main Street St. Louisville OH 43071', 'OH 43071')).toBe(true);
        expect(addressHasZipCode('10 Pussy Cat Rd. Chicago EX 34342', 'EX 34342')).toBe(true);
    });

    test('returns false when address does not end with zipcode', () => {
        expect(addressHasZipCode('123 Main Street St. Louisville OH 43071', 'NY 56432')).toBe(
            false
        );
        expect(addressHasZipCode('10 Pussy Cat Rd. Chicago EX 34342', 'OH 43071')).toBe(false);
    });

    test('handles empty zipcode', () => {
        expect(addressHasZipCode('123 Main Street St. Louisville OH 43071', '')).toBe(true);
    });

    test('handles empty address', () => {
        expect(addressHasZipCode('', 'OH 43071')).toBe(false);
    });
});

describe('extractAddressParts', () => {
    test('extracts house number and street from address', () => {
        expect(extractAddressParts('123 Main Street St. Louisville OH 43071', 'OH 43071')).toEqual({
            houseNumber: '123',
            streetAndTown: 'Main Street St. Louisville',
        });
        expect(extractAddressParts('10 Pussy Cat Rd. Chicago EX 34342', 'EX 34342')).toEqual({
            houseNumber: '10',
            streetAndTown: 'Pussy Cat Rd. Chicago',
        });
    });

    test('handles single word street name', () => {
        expect(extractAddressParts('456 Broadway OH 43071', 'OH 43071')).toEqual({
            houseNumber: '456',
            streetAndTown: 'Broadway',
        });
    });

    test('handles address with only house number', () => {
        expect(extractAddressParts('789 OH 43071', 'OH 43071')).toEqual({
            houseNumber: '789',
            streetAndTown: '',
        });
    });

    test('handles multi-word street and town names', () => {
        expect(
            extractAddressParts('22 Green Garden Road New York City NY 10001', 'NY 10001')
        ).toEqual({
            houseNumber: '22',
            streetAndTown: 'Green Garden Road New York City',
        });
    });

    test('trims whitespace after removing zipcode', () => {
        expect(extractAddressParts('123 Main Street   OH 43071', 'OH 43071')).toEqual({
            houseNumber: '123',
            streetAndTown: 'Main Street',
        });
    });
});
