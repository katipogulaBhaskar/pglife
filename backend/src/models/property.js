import mongoose from "mongoose";

// Define the schema for a property
const PropertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    rent: { type: Number, required: true },
    gender: { type: String, required: true }, // E.g., "Male", "Female", "Unisex"
    interestedUsers: [{ type: String }], // List of email addresses of interested users
    image: { type: String } // URL or path to the image
});

// Create the model
const Property = mongoose.model("Pro_perty", PropertySchema);

export default Property;
