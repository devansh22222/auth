import { Link } from "react-router-dom";

export default function Navbar(){
    const s1 = {
        height : "5rem",
        width : "100%",
        border : "1px solid black",
        display : "flex",
        justifyContent : "space-between",
        alignItems  : "center",
        padding : "0px 20px",
        boxSizing : "border-box"
    }
    return (
        <div style={s1}>
            <h1>Logo</h1>
            <h1>Authentication</h1>
            <Link to={"/login"}><button>Login</button></Link>
        </div>
    )
}