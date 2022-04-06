import React, { useEffect, useState } from 'react'
import './Login.css'
import { useDispatch, useSelector } from "react-redux"
import Footer from '../Footer/Footer';
import { useHistory } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function Login(props) {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const [errorMessage, seterrorMessage] = React.useState("");
    const [ErrorOpen, setErrorOpen] = React.useState(false);

    function handleClick() {
        setOpen(true);
    };
    function handleErrorClick() {
        setErrorOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        history.push("./confirm_otp")
    };

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorOpen(false);
    };
    const history = useHistory()
    const gettingUserDetails = useSelector((state) => state.Commands.LoginDetails);
    {
        useEffect(() => {
            if (gettingUserDetails.length !== 0) {
                history.push("/")
            }
        })
    }
    const [LoginMobileNumber, setLoginMobileNumber] = useState("")
    async function LoginSubmitForm(e) {
        e.preventDefault()
        let data = { LoginMobileNumber }
        let result = await fetch(`${props.BaseUrl}/login_process`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        if (result.info === "success") {
            handleClick()
        } else {
            seterrorMessage(result.info)
            handleErrorClick()
        }
    }


    return (
        <>
            <div className="background_image">
            </div>
            <div className='Login text-light'>
                <div className="container">
                    <h1 className='text-center mb-3'><b><u>Login</u></b></h1>
                    <div className="text-center mb-2">
                        <img src="https://www.iamherelearning.com/wp-content/uploads/2020/02/Movie-Icon-1-460x406.png" alt="#" style={{ width: "250px", height: "200px" }} />
                    </div>
                    <div className="login_form">
                        <form className='p-5' onSubmit={LoginSubmitForm}>
                            <h5><b>Mobile Number</b></h5>
                            <div>
                                <span style={{ position: "absolute", marginLeft: "5px", marginTop: "1px", color: "black", fontSize: "18px" }}>+91 </span>
                                <input type="text" className='mobile_input_taken' name="MobileNumber" value={LoginMobileNumber} onChange={(e) => setLoginMobileNumber(e.target.value)} required pattern="(?=.*\d).{10,}" minLength="10" maxLength="10" style={{ fontSize: "18px", paddingLeft: "45px" }} autoComplete="off" autoFocus />
                            </div>
                            <button className="btn btn-primary mt-3 login_input_btn" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    OTP Send to your Mobile number
                </Alert>
            </Snackbar>
            <Snackbar open={ErrorOpen} autoHideDuration={1500} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
export default Login;
