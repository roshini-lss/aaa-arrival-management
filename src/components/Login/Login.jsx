import React, { useState } from "react"
import "./Login.css"
import { CgProfile } from "react-icons/cg"

const Login = () => {
    const techAdminUsername = "TechAdmin"
    const techAdminPassword = "TechAdmin#1"
    const [dataForm, setDataForm] = useState({
        username: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        // validate()
        if (!validate()) {
        }
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    }

    const validate = () => {
        let isValid = true
        const newErrors = { username: "", password: "" }

        // Username validation
        if (!dataForm.username) {
            newErrors.username = "Username is required"
            isValid = false
        }

        // Password validation
        if (!dataForm.password) {
            newErrors.password = "Password is required"
            isValid = false
        } else if (dataForm.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
            isValid = false
        } else if (!/[A-Z]/.test(dataForm.password)) {
            newErrors.password =
                "Password must contain at least one uppercase letter"
            isValid = false
        } else if (!/[a-z]/.test(dataForm.password)) {
            newErrors.password =
                "Password must contain at least one lowercase letter"
            isValid = false
        } else if (!/[0-9]/.test(dataForm.password)) {
            newErrors.password = "Password must contain at least one digit"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }
    console.log(dataForm)

    const onsubmit = (e) => {
        e.preventDefault()
        if (
            techAdminUsername === dataForm.username &&
            techAdminPassword === dataForm.password
        ) {
            console.log(true)
        } else {
            console.log(false)
        }
    }

    return (
        <div className="container">
            <div className="login-card-container">
                <form className="login-form" onClick={onsubmit}>
                    <div className="login-icon">
                        <CgProfile size={80} />
                    </div>
                    {/* <div className="login-title">LOGIN</div> */}
                    <div>
                        <input
                            className="login-input"
                            type="text"
                            value={dataForm.username}
                            name="username"
                            placeholder="Username..."
                            onChange={handleChange}
                        ></input>
                        <p className="error-msg">{errors.username}</p>
                    </div>
                    <div>
                        <input
                            className="login-input"
                            type="password"
                            value={dataForm.password}
                            name="password"
                            placeholder="Password..."
                            onChange={handleChange}
                        ></input>
                        <p className="error-msg">{errors.password}</p>
                    </div>
                    <button className="login-btn pointer" type="submit">
                        Login
                    </button>
                    <div className="login-addons">
                        <div className="pointer">Forgot Password?</div>
                        <div className="pointer">Signup</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
