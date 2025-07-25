import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){

    let [state, setState] = useState("Sign Up");
    let[userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (event) =>{
        

        let fieldName = event.target.name;
        let newValue = event.target.value;

        setUserData((currData)=>{
            return {...currData, [fieldName]:newValue}
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setUserData({
        name: "",
        email: "",
        password: ""
    })
    }

    
    return(
        <div>
            <h1>Login</h1>
            <br />
            <h2>{state === "Sign Up" ? "Create Account" : "Login" }</h2>
            <p>{state === "Sign Up" ? "Create Your Account" : "Login to you account"}</p>

            <form >
                {state === "Sign Up" && (
                    <div>
                        <input type="text" placeholder="Full Name" name="name" value={userData.name} onChange={handleChange} required />
                    </div>
                )}
                
                <div>
                    <input type="email" placeholder="Email" name = "email" value={userData.email} onChange={handleChange} required  />
                </div>
                <div>
                    <input type="password" placeholder="Password" name="password" value={userData.password} onChange={handleChange} required />
                </div>
                <br />
                <button>{state}</button>
                <br />
                {state === "Sign Up" ? (
                    <p>Already have a account? {' '}
                        <span onClick={()=>setState("Sign In")}><a>Login</a></span>
                    </p>
                ) : (
                    <p>Don't have an account? {' '}
                        <span onClick={()=>setState("Sign Up")}><a>Sign Up</a></span>
                    </p>
                )}
                
                
            </form>

        </div>
    )
}