import User  from '../models/user.model.js';  // Import the function
import getUserDetails from '../service/user.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signUpUser = async(req,res) => {
    const { fullname, phone, email, password, college } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ msg: 'User alredy exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, phone, email, password: hashedPassword, college });

        await newUser.save();
        res.status(201).json({ msg: 'User created successfully' });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const logInUser = async(req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

            //Create JWT token with user._id as payload
            const payload = {
                userId: user._id,  // Ensure this is the correct user ID from your database
            };
        // Generate JWT token and set it as a cookie
        const token = jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // expires in 1 hour
        res.status(200).json({
            msg: "Login successful",
            token,
            user: { email: user.email, fullname: user.fullname },
        });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};

/*const changePassword = async(req,res) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    const { oldPassword, newPassword, confirmPassword } = req.body;

   // console.log('Token received:', token);  // Debug log to verify token
   // console.log('Request body:', req.body);  // Debug log to verify body content

    try {

        if(!token) {
            return res.status(400).json({ error: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user) {
            return res.status(401).json({ msg: 'Invalid token' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Old password is incorrect' });
        }

        if(newPassword !== confirmPassword) {
            return res.status(400).json({ msg: 'New password and confim password do not match' });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ msg: 'Password changed successfully!!' });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

};*/

// Controller to fetch user details by email
const getUserDetailsByEmail = async (req, res) => {
    const { email } = req.body;  // Get email from the request body

    // Check if email is provided
    if (!email) {
        return res.status(400).json({ msg: 'Email is required to fetch user details.' });
    }

    try {
        // Find the user by email and exclude the password field from the response
        const user = await User.findOne({ email }).select('-password');  // Exclude the password from the result

        // If no user is found with the provided email
        if (!user) {
            return res.status(404).json({ msg: 'User not found with the provided email.' });
        }

        // Send back the user details
        return res.status(200).json(user);

    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching user details by email:', error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const logoutUser = async(req,res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ msg: 'User logged out successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export { signUpUser, logInUser, getUserDetailsByEmail, logoutUser };