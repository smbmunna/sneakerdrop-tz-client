import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";



const Login = () => {
    //const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate();
    const { googleLogin } = useAuth();
    const handleGoogleLogin = () => {
        //console.log(googleLogin); 
        //return ; 
        googleLogin()
            .then(result => {
                // if (result.user) {
                //     const userData = {
                //         name: result.user?.displayName,
                //         email: result.user.email                        
                //     };
                //     axiosSecure.post('/user', userData); 
                // }
                navigate(from);  
                //console.log(result.user);
                
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <h1 className="font-semibold text-xl mb-16">Login Page </h1>
            <button onClick={handleGoogleLogin} className="btn btn-soft btn-secondary">Google Login</button>
        </div>
    )
}

export default Login; 