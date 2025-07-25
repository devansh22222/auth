import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "./context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar(){
    const s1 = {
        height : "5rem",
        width : "100%",
        border : "1px solid black",
        display : "flex",
        justifyContent : "space-between",
        alignItems  : "center",
        padding : "0px 20px",
        boxSizing : "border-box",
        
    }

    const navigate = useNavigate();
    const {userData, backendURL, setUserData, setIsLoggedIn, isLoggedIn} = useContext(AppContent);

    const logout = async ()=>{
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendURL + "/api/auth/logout");
            data.success && setIsLoggedIn(false)
            data.success && setUserData(false)
            navigate("/")


        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div style={s1}>
            <h1>Logo</h1>
            <h1>Authentication</h1>
            {
                isLoggedIn ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <Link to={"/auth"}><button>Login</button></Link>
                )
            }
        </div>
    )
}