// Mock Database (replace with MongoDB, MySQL, etc., as needed)
const cities = [
    { _id: 1, name: 'Delhi', page: 'list.html' },
    { _id: 2, name: 'Mumbai', page: 'list_1.html' },
    { _id: 3, name: 'Bengaluru', page: 'list_2.html' },
    { _id: 4, name: 'Hyderabad', page: 'list_3.html' },
];

// Get all cities
export const getCities = (req, res) => {
    res.json(cities);
};

// Check if city exists and return its page URL
export const checkCity = (req, res) => {
    const cityName = req.query.city?.toLowerCase();
    if (!cityName) {
        return res.status(400).json({ message: 'City parameter is required' });
    }

    const city = cities.find((c) => c.name.toLowerCase() === cityName);
    if (city) {
        return res.json({ page: city.page });
    } else {
        return res.status(404).json({ message: 'City not found' });
    }
};
