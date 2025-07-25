import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../component/context/AppContext";
import axios from "axios"
import { toast } from "react-toastify";
import "../index.css"

export default function Login(){

    let [state, setState] = useState("Sign Up");
    let[userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const {backendURL,setIsLoggedIn,getUserData} = useContext(AppContent)

    const handleChange = (event) =>{
        

        let fieldName = event.target.name;
        let newValue = event.target.value;

        setUserData((currData)=>{
            return {...currData, [fieldName]:newValue}
        })
    }

    const handleSubmit = async (event) =>{

        try {
            event.preventDefault();

            // This will send cookies
            axios.defaults.withCredentials = true;
            if(state  === "Sign Up"){

                const {data} = await axios.post(backendURL + "/api/auth/register", userData);

                if(data.success){
                    setIsLoggedIn(true);
                    getUserData();
                    navigate("/");
                }else{
                    toast.error(data.message)
                }

            }else{

                 const {data} = await axios.post(backendURL + "/api/auth/login", userData);

                if(data.success){
                    setIsLoggedIn(true);
                    getUserData();
                    navigate("/");
                    toast.success("Welcome")
                }else{
                   toast.error(error.response?.data?.message || error.message || "Something went wrong")
                }

            }
        } catch (error) {
            const msg = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(msg);
        }




        
        setUserData({
        name: "",
        email: "",
        password: ""
    })
    }

    
    return(
        <div className="auth">
            <div className="auth-container">
                <br />
                <h2 style={{textAlign:"center"}}>{state === "Sign Up" ? "Create Account" : "Login" }</h2>

                <form onSubmit={handleSubmit}>
                    {state === "Sign Up" && (
                        <div>
                            <label htmlFor="fullName">Full Name:</label>
                            <input type="text" placeholder="Full Name" id="fullName" name="name" value={userData.name} onChange={handleChange} required />
                        </div>
                    )}
                    
                    <br />
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder="Email" id="email" name = "email" value={userData.email} onChange={handleChange} required  />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder="Password" id = "password"  name="password" value={userData.password} onChange={handleChange} required />
                    </div>
                    <br />
                    <button style={{marginLeft: "7rem"}}>{state}</button>
                    <br />
                    <br />
                    {state === "Sign Up" ? (
                        <div className="auth-footer">
                            <p>Already have a account? {' '}</p>
                            <span onClick={()=>setState("Sign In")}><a>Login</a></span>
                        </div>
                    ) : (
                        <div className="auth-footer">
                            <p>Don't have an account? {' '}</p>
                            <span onClick={()=>setState("Sign Up")}><a>Sign Up</a></span>
                        </div>
                    )}
                    
                    
                </form>
            </div>
        </div>
    )
}