import React, { useEffect, useState } from 'react'
import './Homepage.css'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"
import Footer from '../Footer/Footer';


function Homepage(props) {
    const history = useHistory()
    const [loading, setloading] = useState(false)
    const gettingUserDetails = useSelector((state) => state.Commands.LoginDetails);
    {
        useEffect(() => {
            if (gettingUserDetails.length === 0) {
                history.push("/login")
            }
        })
    }
    const [all_items, setAllItem] = useState([])
    useEffect(() => {
        fetch(`${props.BaseUrl}/homepage_categories`).then((result) => {
            result.json().then((resp) => {
                setAllItem(resp)
                setloading(true)
            })
        })
    }, [])
    return (
        <>
            {loading ?
                <>
                    <div className="container-fluid mb-5">
                        <div className='AllCategoryVideo px-3'>
                            <>
                                {
                                    all_items.map((all_item_details, i) =>
                                        <div id={`${all_item_details.id}`.replace(/\s+/g, '')} className="carousel slide" data-bs-interval="false">
                                            <div className="carousel-inner">
                                                {/* <p className='pt-3' style={{ fontSize: "28px" }}><b><Link to={`/single_category/${category_id}`} style={{ textDecoration: "none", color: "white" }}>Latest & Trending</Link></b></p> */}
                                                <p className='pt-3' style={{ fontSize: "28px" }}><b><Link to={`/single_category/5`} style={{ textDecoration: "none", color: "white" }}>{all_item_details.id}</Link></b></p>
                                                <div className="carousel-item zoom_on_hover active">
                                                    <div className="row">
                                                        {
                                                            (all_item_details.data).slice(0, 8).map((Category_all_item_details, i) =>
                                                                <div className={`col carousel_item_${i} pb-4`}>
                                                                    {/* <Link to={`/single_video/${video_id}`}> */}
                                                                    <Link to={`/single_video/${Category_all_item_details.id}`}>
                                                                        <div className="video_thumbnail">
                                                                            <img className="d-block w-100 carousel_item" src={Category_all_item_details.movie_cover_image} alt="#" style={{ height: "275px" }} />
                                                                            <div className='w-100 px-2 video_description'>
                                                                                <h6>{Category_all_item_details.title}</h6>
                                                                                <p style={{ fontSize: "10px", marginTop: "-5px" }}>{Category_all_item_details.released} * {Category_all_item_details.description}</p>
                                                                                <h6 style={{ color: "white", fontSize: "10px" }}><i className="fa fa-play"></i> WATCH MOVIE</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="carousel-item zoom_on_hover">
                                                    <div className="row">
                                                        {
                                                            (all_item_details.data).slice(9, 17).map((Category_all_item_details, i) =>
                                                                <div className={`col carousel_item_${i} pb-4`}>
                                                                    <Link to={`/single_video/${Category_all_item_details.id}`}>
                                                                        <div className="video_thumbnail">
                                                                            <img className="d-block w-100 carousel_item" src={Category_all_item_details.movie_cover_image} alt="#" style={{ height: "275px" }} />
                                                                            <div className='w-100 px-2 video_description'>
                                                                                <h6>{Category_all_item_details.title}</h6>
                                                                                <p style={{ fontSize: "10px", marginTop: "-5px" }}>{Category_all_item_details.released} * {Category_all_item_details.description}</p>
                                                                                <h6 style={{ color: "white", fontSize: "10px" }}><i className="fa fa-play"></i> WATCH MOVIE</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="carousel-item zoom_on_hover">
                                                    <div className="row">
                                                        {
                                                            (all_item_details.data).slice(18, 26).map((Category_all_item_details, i) =>
                                                                <div className={`col carousel_item_${i} pb-4`}>
                                                                    <Link to={`/single_video/${Category_all_item_details.id}`}>
                                                                        <div className="video_thumbnail">
                                                                            <img className="d-block w-100 carousel_item" src={Category_all_item_details.movie_cover_image} alt="#" style={{ height: "275px" }} />
                                                                            <div className='w-100 px-2 video_description'>
                                                                                <h6>{Category_all_item_details.title}</h6>
                                                                                <p style={{ fontSize: "10px", marginTop: "-5px" }}>{Category_all_item_details.released} * {Category_all_item_details.description}</p>
                                                                                <h6 style={{ color: "white", fontSize: "10px" }}><i className="fa fa-play"></i> WATCH MOVIE</h6>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target={`#${all_item_details.id}`.replace(/\s+/g, '')} data-bs-slide="prev" style={{ width: "50px", height: "100%" }}>
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={`#${all_item_details.id}`.replace(/\s+/g, '')} data-bs-slide="next" style={{ width: "50px", height: "100%" }}>
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    )
                                }
                            </>
                        </div>
                    </div>
                    <Footer />
                </>
                :
                <>
                    <div style={{ height: "100vh", overflow: 'hidden' }}>
                        <div class="loading_spinner">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div className="fixed-bottom">
                            <Footer />
                        </div>
                    </div>
                </>
            }
        </>
    );
}
export default Homepage;
