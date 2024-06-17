import React, { useContext } from "react"
import "./Login.css"
import { CgProfile } from "react-icons/cg"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"
import { UserContext } from "../../contexts/UserContext"
const Login = () => {
    const techAdminUsername = "TechAdmin"
    const techAdminPassword = "TechAdmin#1"
    const callManagementUsername = "RoadServiceAdmin"
    const callManagementPassword = "RoadServiceAdmin#1"
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        if (
            techAdminUsername === data.username &&
            techAdminPassword === data.password
        ) {
            setUser(techAdminUsername)
            navigate("/by-region")
        } else if (
            callManagementUsername === data.username &&
            callManagementPassword === data.password
        ) {
            setUser(callManagementUsername)
            navigate("/call-management-orders")
        } else {
            toast.warning("Invalid Credentials")
        }
    }
    return (
        <div className="container">
            <Toaster position="top" />
            <div className="login-card-container">
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="login-icon">
                        <CgProfile size={80} />
                    </div>
                    <div>
                        <input
                            className="login-input"
                            type="text"
                            name="username"
                            placeholder="Username..."
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                        <p className="error-msg">{errors.username?.message}</p>
                    </div>
                    <div>
                        <input
                            className="login-input"
                            type="password"
                            name="password"
                            placeholder="Password..."
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must be at least 8 characters",
                                },
                                validate: {
                                    uppercase: (value) =>
                                        /[A-Z]/.test(value) ||
                                        "Atleast one uppercase letter required",
                                    lowercase: (value) =>
                                        /[a-z]/.test(value) ||
                                        "Password must contain at least one lowercase letter",
                                    digit: (value) =>
                                        /[0-9]/.test(value) ||
                                        "Password must contain at least one digit",
                                },
                            })}
                        />
                        <p className="error-msg">
                            {errors.password ? errors.password.message : ""}
                        </p>
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
