import React, { useEffect, useState } from 'react'
import './Login.css'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LoginDetailsSave } from "../actions/index"
import OTPInputField from './OTPInputField';


function ConfirmOTP() {
    
    const history = useHistory()
    const gettingUserDetails = useSelector((state) => state.Commands.LoginDetails);
    {
        useEffect(() => {
            if (gettingUserDetails.length !== 0) {
                history.push("/")
            }
        })
    }
    const dispatch = useDispatch();


    return (
        <>
            <div className="background_image">
            </div>
            <div className='Login text-light'>
                <div className="container-lg">
                    <h1 className='text-center mb-3'><b><u>Confirm OTP</u></b></h1>
                    <div className="text-center mb-5">
                        <img src="https://www.iamherelearning.com/wp-content/uploads/2020/02/Movie-Icon-1-460x406.png" alt="#" style={{ width: "250px", height: "200px" }} />
                    </div>
                    <div>
                        <OTPInputField dispatch={dispatch} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmOTP;




