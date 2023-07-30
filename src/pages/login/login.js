import React from 'react'
import { useState } from 'react'
import firebaseInstance from '../../firebase'
import { useHistory } from "react-router-dom";
import './login.css'
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from '../../firebase'


const initialState = {
    email: '',
    password: ''
}
function Login() {

    const [formValue, setFormValue] = useState(initialState)
    const history = useHistory()
    const onHandleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })

    }

    const onFormSubmit = async (event) => {
        event.preventDefault()
        if (formValue.email.length === 0) {
            toast.error('Email is Required')
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(formValue.email)) {
            toast.error('Please provide a valid email.');
            return;
        }
        firebaseInstance.login(formValue)
            .then(async (cred) => {
                const docRef = doc(db, "users", cred.user.uid);
                const docSnap = await getDoc(docRef);
                const user_data = docSnap.data();
                localStorage.setItem('user', JSON.stringify(user_data))
                try {
                    console.log(docSnap.data());
                } catch (error) {
                    console.log(error)
                }
                toast.success("Login Successfully")
                setTimeout(() => {
                    if (localStorage.getItem("token")) {
                        history.push('/profile')
                    }
                }, 2000);
            })
            .catch(err => {
                console.log(err)
                toast.error("Login Failed")
                return;
            })
    }
    return (
        <div className="Auth-form-container">
            <ToastContainer />

            <form onSubmit={onFormSubmit} className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            name='email'
                            onChange={onHandleChange}

                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name='password'
                            onChange={onHandleChange}
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password  mt-2">
                        Have no account? <a href="/signup">Signup</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login