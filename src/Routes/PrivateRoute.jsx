import { Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";



const PrivateRoute= ({children})=>{
    const {loading, user}= useAuth(); 
    const location= useLocation(); 
    //const navigate= useNavigate(); 
    
    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }

    if(!user){        
        return <Navigate to='/login' state= {{from: location}}/>
    }


    return children; 
}


export default PrivateRoute; 