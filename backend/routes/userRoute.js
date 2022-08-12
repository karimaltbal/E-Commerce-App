const express = require("express");
const router = express.Router()

const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    updatePassword,
    getAllUsers,
    getUserById,
    getProfile,
    updateProfile,
    deleteUser,
    updateUserRole
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");



router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);



router.post("/user/password/forgot", forgotPassword);
router.put("/user/password/update", isAuthenticatedUser, updatePassword);



router.get("/admin/users", isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.get("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"),  getUserById);
router.put("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);
router.delete("/admin/user/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteUser);



router.get("/profile", isAuthenticatedUser, getProfile);
router.put("/profile/update", isAuthenticatedUser, updateProfile);




module.exports = router