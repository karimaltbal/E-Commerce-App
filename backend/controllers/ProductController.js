const Product = require("../models/ProductModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Apifeatures = require("../utils/apifeatures")
const cloudinary = require("cloudinary");







//Get All Products for user
const getAllProoduct = catchAsyncErrors( async (req, res) => {

    const productCount = await Product.countDocuments();
    const resultPerPage = 8;

    const apiFeatures = new Apifeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const product = await apiFeatures.query;


    res.status(200).json({
        success: true,
        product,
        productCount,
        resultPerPage
    });
})


//Get All Products for admin
const getAllProoductAdmin = catchAsyncErrors( async (req, res) => {

    const products = await Product.find();
    const productCount = await Product.countDocuments();


    res.status(200).json({
        success: true,
        products,
        productCount
    });
})



//Get Product by ID
const getProductById = catchAsyncErrors( async (req, res, next)=>{
    const product = await Product.findById(req.params.id)

    if (!product) { return next(new ErrorHander("Product not found", 404));}

    res.status(200).json({
        success: true,
        product
    })
})













//Create Products  -- Admin
const createProduct = catchAsyncErrors(async (req, res)=>{

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], { folder: "products", });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;


    const product = await Product.create(req.body)

    res.status(200).json({
        success: true,
        product
    })
})



//Updata Products  -- Admin
const updataProduct = catchAsyncErrors( async (req, res, next)=>{
    const productExist = await Product.findById(req.params.id)


    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < productExist.images.length; i++) {
        await cloudinary.v2.uploader.destroy(productExist.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        }

        req.body.images = imagesLinks;
    }

    if (!productExist) { return next(new ErrorHander("Product not found", 404));}

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        product
    })
})



//DELETE Products  -- Admin
const deleteProduct = catchAsyncErrors( async (req, res, next)=>{
    const productExist = await Product.findById(req.params.id)

    if (!productExist) { return next(new ErrorHander("Product not found", 404));}

      // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.findByIdAndRemove(req.params.id)

    res.status(200).json({
        success: true,
        message: "Done Delete Product",
    });
})









// Create and Update Reviwes
const createProductReviwe = catchAsyncErrors(async(req, res)=>{

    const { rating, comment, productId } = req.body

    const reviwe = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (ele) => ele.user.toString() === req.user._id.toString()
    );    

    if(isReviewed){
        product.reviews.forEach(ele => {
            if(ele.user.toString() === req.user._id.toString()){
                (ele.rating = rating), (ele.comment = comment);
            }
        });
    }else{
        product.reviews.push(reviwe);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0
    product.reviews.forEach((ele)=>{
        avg += ele.rating
    })

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
    success: true,
    message: "Done Send Your Comment"
    });
});



// Get All Reviews of a product
const getAllReviwes = catchAsyncErrors(async (req, res)=>{
    const product = await Product.findById(req.query.id);

    if (!product) { return next(new ErrorHander("Product not found", 404));}

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
})




// Delete Review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) { return next(new ErrorHander("Product not found", 404));}

    const reviews = product.reviews.filter( (rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;
    reviews.forEach((rev) => { avg += rev.rating });

    let ratings = 0;
    reviews.length === 0? ratings = 0: ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});



module.exports = {
    getAllProoduct,
    getAllProoductAdmin,
    getProductById,
    createProduct,
    updataProduct,
    deleteProduct,

    createProductReviwe,
    getAllReviwes,
    deleteReview,
};