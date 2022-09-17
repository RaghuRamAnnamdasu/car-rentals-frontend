import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import "../Login/login.css";
import { signupEmailId, signupPassword, signupUserName, signupEmailError,signupPasswordError } from "../Redux/actions/signup_action";
import { API } from "../global";



export function SignUp(){

    const navigate = useNavigate();

    const { userName, email, password, emailError, passwordError } = useSelector((state) => state.signupReducer);
    
    const dispatch = useDispatch();

    const onUserNameChange = (e) => {
        dispatch(signupUserName(e));
    }

    const onEmailChange = (e) => {
        dispatch(signupEmailId(e));
    }

    const onPasswordChange = (e) => {
        dispatch(signupPassword(e));
    }


    function isEmailValid() {
        const emailRegexp = new RegExp(
          /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
        );
        
        if(!emailRegexp.test(email)) {
            const err = "Enter a Valid Email Address";
            dispatch(signupEmailError(err));
        } else {
            const err = "";
            dispatch(signupEmailError(err));
        }
    }

    function isPasswordValid() {
        
        
        if(password.length < 8) {
            const err = "Password should be minimum of 8 characters";
            dispatch(signupPasswordError(err));
        } else {
            const err = "";
            dispatch(signupPasswordError(err));
        }
    }

    const onSignUp = async (e) => {
        e.preventDefault();

        try{

            var data = [{
                email: email,
                password: password,
                userName: userName
            }];

            const result = await fetch(`${API}/users/signup`,{
                method : "POST",
                body: JSON.stringify(data),
                headers: {"content-type": "application/json"}
            }).then((response)=>response.json());

            console.log(result);

            if(result.emailError) {
                dispatch(signupEmailError(result.message));
            } else if(result.passwordError){
                dispatch(signupPasswordError(result.message));
            }else {
             navigate("/login");
            }

        }catch(error){

            console.log(error);
        }

        
    };


    return(
        <div className="signup">
            <form className="signupContent" onSubmit={(e) => onSignUp(e)}>
                <div className="displayNameWrapper">
                    <label htmlFor="display">User Name</label>
                    <input id="display" type="text" onChange={(e) => onUserNameChange(e)} required/>
                </div>
                <div className="userNameWrapper">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" onChange={(e) => onEmailChange(e)} onBlur={isEmailValid} className={emailError ? "redBorderInput" : ""} required/>
                    <div className="emailError">{emailError}</div>
                </div>
                <div className="passwordWrapper">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={(e) => onPasswordChange(e)} onBlur={isPasswordValid} className={passwordError ? "redBorderInput" : ""}required/>
                    <div className="passwordError">{passwordError}</div>
                </div>
                <Button type="submit" variant="contained">Sign up</Button>
                <div className="accountExists">Already have an account? <span onClick={() => navigate("/login")}>&nbsp;Login</span></div>
            </form>
            <div className="rentText">
                <div>
                    <div>WHY BUY A CAR?</div>
                    <div>JUST RENT ONE!</div>
                </div>
                <p>Maintaining a car is always a hassle. The increasing petrol prices, having to service it regularly and keeping it clean will sometimes make you consider renting rather than buying.</p>
            </div>
      </div>
    );
}