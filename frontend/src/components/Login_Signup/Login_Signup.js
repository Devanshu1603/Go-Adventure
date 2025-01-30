import React, { useEffect, useState } from 'react';
import './Login_Signup.css';
import travelImage from '../images/travel.jpg';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { toast } from 'react-toastify';

const Login_Signup = ({ setIsAuthenticated }) => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const location = useLocation();

    // Extract the redirectTo path from state or fallback to "/"
    const redirectTo = location.state?.from?.pathname;

    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: 'top-right'
        })
    }

    const handleError = (msg) => {
        toast.error(msg, {
            position: 'top-right'
        })
    }

    

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        if (signUpButton && signInButton && container) {
            signUpButton.addEventListener('click', () => {
                container.classList.add("right-panel-active");
                setIsSignup(true);
            });

            signInButton.addEventListener('click', () => {
                container.classList.remove("right-panel-active");
                setIsSignup(false);
            });
        }

        // Cleanup function to remove event listeners
        return () => {
            if (signUpButton && signInButton) {
                signUpButton.removeEventListener('click', () => {
                    container.classList.add("right-panel-active");
                });

                signInButton.removeEventListener('click', () => {
                    container.classList.remove("right-panel-active");
                });
            }
        };
    }, []);

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleloginChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handlesingupChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required');
        }
        try {
            const url = "https://tourism-five-azure.vercel.app/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setIsAuthenticated(true); // Update authentication state on successful login
    
                // Ensure redirection happens only after successful authentication
                setTimeout(() => {
                    navigate('/'); // Redirect to home page
                }, 1000); // Optionally, add a delay for a smoother transition
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }
    

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = "https://tourism-five-azure.vercel.app/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/');
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    

    return (
        <>
            <div className="login-container">
                <img src={travelImage} alt="" />
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleSignup}>
                            <h1 className="text">Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handlesingupChange}
                                value={signupInfo.name}
                                required={isSignup}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handlesingupChange}
                                value={signupInfo.email}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handlesingupChange}
                                value={signupInfo.password}
                                required
                            />
                            <button className='sing-up-button' type="submit">Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleLogin}>
                            <h1 className="text">Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleloginChange}
                                value={loginInfo.email}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleloginChange}
                                value={loginInfo.password}
                                required
                            />
                            <a href="#">Forgot your password?</a>
                            <button className='sing-in-button' type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left" style={{
                                position: 'relative',
                                right: '0px',
                            }}>
                                <h1 className="text">Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right" style={{
                                position: 'absolute',
                                left: '380px'
                            }}>
                                <h1 className="text">Hello, Friend!</h1>
                                <p>Enter your personal details and start your journey with us</p>
                                <button className="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login_Signup;