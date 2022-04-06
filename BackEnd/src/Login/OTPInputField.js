import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import './Login.css'
import { LoginDetailsSave } from "../actions/index"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default class OTPInputField extends Component {
    state = { generatedOTP: '', ErrorOpen: false, errorMessage: '' };

    handleChange = (generatedOTP) => this.setState({ generatedOTP });


    handleErrorClick = () => {
        this.setState({ ErrorOpen: true })
    };



    handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ ErrorOpen: false })
    };

    async FormSubmitConfirmOTP(e) {
        e.preventDefault()
        fetch(`http://127.0.0.1:5000/confirm_otp_process/${this.state.generatedOTP}`).then((result) => {
            result.json().then((resp) => {
                if (resp.info === "success") {
                    this.props.dispatch(LoginDetailsSave(resp.UserDetail[0], resp.UserDetail[1], resp.UserDetail[2], resp.UserDetail[3]))
                } else {
                    this.setState({ errorMessage: resp.info })
                    this.handleErrorClick()
                }
            })
        })
    }

    render() {

        const Alert = React.forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
        });

        return (
            <>
                <form onSubmit={(e) => this.FormSubmitConfirmOTP(e)} className='otp_form'>
                    <div className='otp_form_input'>
                        <OtpInput inputStyle={{ fontSize: "24px", width: "100%" }} isInputNum={true} value={this.state.generatedOTP} onChange={this.handleChange} numInputs={6} separator={<span>-</span>} shouldAutoFocus={true} />
                    </div>
                    <button className="btn btn-primary mt-3 confirm_input_btn" type="submit">Confirm</button>
                </form>

                <Snackbar open={this.state.ErrorOpen} autoHideDuration={1500} onClose={this.state.handleErrorClose}>
                    <Alert onClose={this.state.handleErrorClose} severity="error" sx={{ width: '100%' }}>
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
            </>
        );
    }
}