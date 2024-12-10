import User from '../models/user.model.js';

const getUserDetails = async(userId) => {

    try {
        const user = await User.findById(userId).select('-password');

        if(!user) {
            throw new Error('User not found');
        }
        return user;

    } catch (err) {
        throw new Error(err.message);
    }
}

export default getUserDetails;