import { useRef, useState } from "react";
import axios from "axios";
import "./login.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Login({setShowLogin,setCurrentUser,myStorage}) {
    const[error, setError] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();


    const handleSubmit = async(e)=>{
        e.preventDefault();

        const User = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        };

        try{
            const res = await axios.post("/users/login",User);
            myStorage.setItem("user",res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
            setError(false);
            alert("Logged in Successfully!!")
        }catch(err){
            alert("Something went Wrong!")
            console.log(err);
            setError(true);
        }
    }


return (
    <div className="loginContainer">
        <div className="logo">
            <LocationOnIcon /> Mappify
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" ref={nameRef}></input>
            <input type="password" placeholder="password" ref={passwordRef}></input>
            <button className="loginButton">Login Me!</button>
            {error && 
            <span className="failure">Something went wrong!</span>}
            
        </form>
        <CancelIcon className="loginCancel" onClick={()=> setShowLogin(false)} />
    </div>
)
}
