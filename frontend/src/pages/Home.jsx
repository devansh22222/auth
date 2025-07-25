import Navbar from "../component/Navbar";

export default function Home(){
    
    let s = {
        display: "flex",
        flexDirection: "column",
        justifycontent:"center",
        alignItems : "center"
    }

    return (
        <div style={s}> 
            <Navbar/>
            <h1>Hello</h1>
            <h2>Welcome</h2>
            <button>Get Started</button>
        </div>
    )
}