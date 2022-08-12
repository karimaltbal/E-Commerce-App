const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");




// Register a User
const registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });



    const { name, email, password } = req.body;

    const userExist = await User.findOne({email})
    if (userExist) { return next(new ErrorHander("This User Already Exist", 401));}

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    sendToken(user, 200, res)

});



// Login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    if (!email || !password) { return next(new ErrorHander("Please Enter Email & Password", 400));}

    const user = await User.findOne({ email }).select("+password");
    if (!user) { return next(new ErrorHander("Invalid email", 401));}

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) { return next(new ErrorHander("Invalid password!", 401));}

    sendToken(user, 200, res);

});





//LogOut
const logoutUser = catchAsyncErrors(async (req, res, next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Done LogOut"
    })
})

















/***(مش مفهوم)***/


// Forgot Password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander(error.message, 500));
    }
});







// Reset Password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
        new ErrorHander(
            "Reset Password Token is invalid or has been expired",
            400
        )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});











//Updata Password
const updatePassword = catchAsyncErrors(async (req, res, next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Old password is incorrect", 400));
    }

    if (req.body.oldPassword == req.body.newPassword) {
        return next(new ErrorHander("The new password must be different from the old password", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

})













//Get All Users
const getAllUsers = catchAsyncErrors( async (req, res) => {

    const userCount = await User.countDocuments();

    const user = await User.find();

    res.status(200).json({
        success: true,
        user,
        userCount
    });
})


//Get User By Id
const getUserById = catchAsyncErrors( async (req, res, next)=>{
    const user = await User.findById(req.params.id)

    if (!user) { return next(new ErrorHander("This User not found", 404));}

    res.status(200).json({
        success: true,
        user
    })
})










//Get Profile User
const getProfile = catchAsyncErrors( async (req, res, next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})


// update User Profile
const updateProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };
    
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});






// update User Role -- Admin
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});









//DELETE Users  --Admin
const deleteUser = catchAsyncErrors( async (req, res, next)=>{
    const userExist = await User.findById(req.params.id)

    if (!userExist) { return next(new ErrorHander("This User not found", 404));}

    await User.findByIdAndRemove(req.params.id)

    res.status(200).json({
        success: true,
        message: "Done Delete User",
    });
})




module.exports = {
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
};