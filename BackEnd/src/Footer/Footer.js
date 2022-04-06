import { Link } from 'react-router-dom';
import React from 'react'
import "./Footer.css"

function Footer() {
    return (
        <>
            <div className="row pb-5 pt-3">
                <div className="col-md-6">
                    <ul className='footer_option_container'>
                        <li className='footer_options_link'><Link to="/" className='footer_options'>About Disney+ Hotstar</Link></li>
                        <li className='footer_options_link'><Link to="/" className='footer_options'>Terms Of Use</Link></li>
                        <li className='footer_options_link'><Link to="/" className='footer_options'>Privacy Policy</Link></li>
                        <li className='footer_options_link'><Link to="/" className='footer_options'>FAQ</Link></li>
                        <li className='footer_options_link'><Link to="/" className='footer_options'>Feedback</Link></li>
                        <li className='footer_options_link'><Link to="/" className='footer_options'>Careers</Link></li>
                    </ul>
                    <br />
                    <p style={{ fontSize: "14px", paddingLeft: "30px", color: "rgba(255, 255, 255, 0.8)" }}>© 2022 STAR. All Rights Reserved. HBO, Home Box Office and all related channel and programming logos are service marks of, and all related programming visuals and elements are the property of, Home Box Office, Inc. All rights reserved.</p>
                </div>
                <div className="col-md-6 px-md-4" style={{ textAlign: "right" }}>
                    <div className="row">
                        <div className="col-md-5 col-4">
                            <p style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.8)" }}>Connect with us</p>
                            <Link to="/" className='px-2'><img src="https://pnggrid.com/wp-content/uploads/2021/04/Transparent-Facebook-Logo-Square-1024x1024.png" alt="#" width="40px" height="40px" /></Link>
                            <Link to="/" className='px-2'><img src="https://pnggrid.com/wp-content/uploads/2021/07/Twitter-Logo-Square.png" alt="#" width="42px" height="42px" /></Link>
                        </div>
                        <div className="col-md-7 col-8 text-center">
                            <p style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.8)" }}>Disney+ Hotstar App</p>
                            <Link to="/" className='px-2'><img src="https://dctfcu.com/wp-content/uploads/sites/63/2018/04/google-play-logo-1518163351.png" alt="#" width="135px" height="40px" style={{ marginTop: "5px" }} /></Link>
                            <Link to="/" className='px-2'><img src="https://img.favpng.com/18/23/8/app-store-apple-download-logo-png-favpng-2BMS9KidgmX2fHMtAhjpVHway.jpg" alt="#" width="135px" height="40px" style={{ marginTop: "5px" }} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Footer;
