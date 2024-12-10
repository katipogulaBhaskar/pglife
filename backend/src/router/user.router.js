import express from "express";
import { logInUser, signUpUser, logoutUser, getUserDetailsByEmail} from '../controller/user.controller.js';
import { getCities, checkCity } from '../controller/search.controller.js';
//import { getUserInterestedProperties } from "../controller/property.controller.js";


//import  authenticationToken  from '../middleware/user.middleware.js'

const router = express.Router();

router.post('/signupUser', signUpUser);

router.post('/loginUser', logInUser);

//router.put('/change-password',protectRoute, changePassword);

router.post('/details', getUserDetailsByEmail);

//router.get("/user/:email/properties", getUserInterestedProperties);

router.get('/search',  checkCity);


router.get('/logout', logoutUser);

export default router;