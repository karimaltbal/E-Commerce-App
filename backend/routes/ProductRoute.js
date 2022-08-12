const express = require("express");
const router = express.Router()

const {
    getAllProoduct,
    getAllProoductAdmin,
    getProductById,
    createProduct,
    updataProduct,
    deleteProduct,


    createProductReviwe,
    getAllReviwes,
    deleteReview
} = require("../controllers/ProductController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");




router.get("/products/", getAllProoduct);
router.get("/products/:id", getProductById);

router.get("/admin/products", isAuthenticatedUser, authorizeRoles("admin"), getAllProoductAdmin)
router.post("/admin/products/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.put("/admin/products/:id", isAuthenticatedUser, authorizeRoles("admin"), updataProduct);
router.delete("/admin/products/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.put("/reviwe", isAuthenticatedUser, createProductReviwe);
router.get("/reviews", isAuthenticatedUser, getAllReviwes);
router.delete("/review", isAuthenticatedUser, deleteReview);


module.exports = router