import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

import "./LoginSignUp.css";
import imgProfile from "./profile.webp";
import Loader from "../layout/Loader/Loader";

import { loginAction, rigesterAction, clearError } from "../../redux/actions/userActions";
import { useAlert } from "react-alert";




const LoginSignUp = () => {
    
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const shipingPage = searchParams.get("redirect");

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [avatarr, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState(imgProfile);


    const { error, loading, isAuthenticated } = useSelector((state) => state.auth);

    
    const loginSubmit = (e) => {
        e.preventDefault();

        dispatch(loginAction(loginEmail, loginPassword));
    };




    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        const avatar = myForm.append("avatar", avatarr);

        const registerData = { name, email, password, avatar };
        console.log(registerData)
        dispatch(rigesterAction(registerData));
    };




    const registerDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };


    const redirect = shipingPage ? shipingPage : "account";

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (isAuthenticated) { navigate("/" + redirect); }
    }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);




    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };




    return (
        <Fragment>
            {loading? (
                <Loader />
            ):(
                <Fragment>
                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signUp_toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forget Password ?</Link>
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className="signUpEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatarr"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                    </div>
                </div>
                </Fragment>
            )}

        </Fragment>
    );
};

export default LoginSignUp;
