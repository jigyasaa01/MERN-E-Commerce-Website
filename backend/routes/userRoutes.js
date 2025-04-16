import express from "express";
import { 
    createUser, 
    loginUser, 
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from '../controllers/userController.js'
import { authenticateUser,authorizeAdmin } from '../middlewares/authMiddleware.js'


const router = express.Router()

router
    .route('/')
    .post(createUser)
    .get(authenticateUser,authorizeAdmin,getAllUsers);
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)
router
    .route('/profile')
    .get(authenticateUser,getCurrentUserProfile)
    .put(authenticateUser, updateCurrentUserProfile);

//admin routes
router
    .route('/:id')
    .delete(authenticateUser,authorizeAdmin, deleteUserById)
    .get(authenticateUser,authorizeAdmin, getUserById)
    .put(authenticateUser,authorizeAdmin, updateUserById);


export default router;