/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CITIES_BY_COUNTRY } from '../content';

/**
 * Simulates fetching a list of regional cities for a given country.
 * @param country The name of the country.
 * @returns A promise that resolves to an array of city names.
 */
export const fetchRegionalCities = (country: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            if (CITIES_BY_COUNTRY[country]) {
                resolve(CITIES_BY_COUNTRY[country]);
            } else {
                // Resolve with an empty array if country not found, let UI handle it
                resolve([]);
            }
        }, 300); // 300ms delay
    });
};
