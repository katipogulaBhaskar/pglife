// Base URL for API
const BASE_URL = 'http://localhost:5000/api/user';

/**
 * Search for a city by name
 * @param {string} city - The name of the city to search for
 * @returns {Promise<object>} - The response containing the city's page or an error message
 */
export const searchCity = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}/search?city=${city}`);
        if (response.ok) {
            return await response.json(); // Return page data if successful
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'City not found');
        }
    } catch (error) {
        console.error('Error searching city:', error.message);
        throw error;
    }
};
