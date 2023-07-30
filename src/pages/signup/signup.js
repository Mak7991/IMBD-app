import React from 'react'
import { useState } from 'react'
import firebaseInstance from '../../firebase'
import { db } from '../../firebase'
import { ToastContainer, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { doc, setDoc } from "firebase/firestore";
import './signup.css'

const initialState = {
    name: '',
    email: '',
    password: '',
    age: ''
}
function Signup() {
    const [formValue, setFormValue] = useState(initialState)
    const history = useHistory()

    const onHandleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })

    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        if (formValue.name.length === 0) {
            toast.error('Name is Required')
            return;
        }
        if (formValue.email.length === 0) {
            toast.error('Email is Required')
            return;
        }
        if(!/^\S+@\S+\.\S+$/.test(formValue.email)){
            toast.error('Please provide a valid email.');
            return;
        }
        if (formValue.password.length === 0) {
            toast.error('Password is Required')
            return;
        }
        if(formValue.password.length < 8){
            toast.error('Password Length must be eight or more characters.');
			return;
        }
        if (formValue.age.length === 0) {
            toast.error('Age is Required')
            return;
        }
        if(formValue.age < 18){
            toast.error('You must be 18 to register in this app');
			return;
        }
        firebaseInstance.signUp(formValue)
            .then((cred) => {
                setDoc(doc(db, "users", cred.user.uid), {
                    id: cred.user.uid,
                    age: formValue.age,
                    name: formValue.name,
                    email: formValue.email
                });
                toast.success("Account created")
                setFormValue(initialState)
                setTimeout(() => {
                    history.push('/login')
                }, 2000);
            })
            .catch(err => {
                toast.error('Account not created')
                return
            })

    }

    
    return (
        <div className="Signup-form-container">
            <form onSubmit={onFormSubmit} className="Signup-form">
                <div className="Signup-form-content">
                    <h3 className="Signup-form-title">Sign Up</h3>

                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                            value={formValue.name}
                            onChange={onHandleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            value={formValue.email}
                            onChange={onHandleChange}

                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            value={formValue.password}
                            onChange={onHandleChange}

                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            className="form-control mt-1"
                            placeholder="e.g 18"
                            value={formValue.age}
                            onChange={onHandleChange}
                        />
                    </div>
                    <div>
                        <ToastContainer />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Already have account?<a href="/login">Login</a>
                    </p>
                </div>
            </form>
        </div>

    )
}

export default Signup