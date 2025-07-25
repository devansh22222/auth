import { useContext } from "react";
import Navbar from "../component/Navbar";
import { AppContent } from "../component/context/AppContext";

export default function Home(){

    const {userData} = useContext(AppContent)
    

    return (
        <>
        <Navbar/>
        <div className="home"> 
            
            <h1>Hello, {userData ? userData.name : "Developer"}</h1>
            <h2>Welcome</h2>
            <button>Get Started</button>
        </div>
        </>
    )
}