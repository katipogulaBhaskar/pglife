import Property from "../models/property.js";

// Controller to fetch properties interested by a user
export const getUserInterestedProperties = async (req, res) => {
    const { email } = req.params;

    try {
        // Fetch properties where the user is listed in `interestedUsers`
        const properties = await Property.find({ interestedUsers: email });

        if (!properties || properties.length === 0) {
            return res.status(404).json({ message: "No properties found for this user." });
        }

        res.status(200).json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
