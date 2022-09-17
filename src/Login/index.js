import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./login.css";
import { loginEmailId, loginPassword, loginErrorMessage } from "../Redux/actions/login_action";
import { API } from "../global";
import { useSelector, useDispatch } from "react-redux";




export function Login({setLoginType}){

    const navigate = useNavigate();

    const { email, password, invalidErrorMessage } = useSelector((state) => state.loginReducer);
    
    const dispatch = useDispatch();


    const onEmailChange = (e) => {
        dispatch(loginEmailId(e));
    }

    const onPasswordChange = (e) => {
        dispatch(loginPassword(e));
    }

    const onLogin = async (e) => {

        e.preventDefault();

        try{

            var data = [{
                email: email,
                password: password
            }];

            const result = await fetch(`${API}/users/login`,{
                method : "POST",
                body: JSON.stringify(data),
                headers: {"content-type": "application/json"}
            }).then((response)=>response.json());

            console.log(result);

            if(result.message === "Successful Login") {
                localStorage.setItem("user", JSON.stringify({token: result.token, userName: result.name, userId: result.id, type : result.type}));
                setLoginType(result.type);
                {result.type && result.type === "admin" ? navigate("/admin/home") : navigate("/")}
            } else {
                dispatch(loginErrorMessage(result.message));
            }

            // e.preventDefault();

        }catch(error){

            console.log(error);
        }
    }


    return(
        <div className="login">
            <form className="loginContent" onSubmit={(e) => onLogin(e)}>
                {invalidErrorMessage && <div className="invalidErrorMessage">{invalidErrorMessage}</div>}
                <div className="userNameWrapper">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" onChange={(e) => onEmailChange(e)}  required/>
                </div>
                <div className="passwordWrapper">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={(e) => onPasswordChange(e)} required/>
                </div>
                <Button type="submit" variant="contained">Login</Button>
                <div className="noAccount">Don't have an account? <span onClick={() => navigate("/signup")}>&nbsp;SignUp</span></div>
                <div className="forgotPasswordLink"> 
                    <span onClick={() => navigate("/forgotpassword")}>&nbsp;Forgotten Password ?</span>
                </div>
            </form>
        </div>
    );
}