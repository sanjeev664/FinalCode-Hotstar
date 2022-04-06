import React, { useEffect, useState } from 'react'
import './SingleVideo.css'
import { Link, useParams } from 'react-router-dom'
import Trailers from './Trailers';
import Footer from '../Footer/Footer';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"


function SingleVideo(props) {
    const history = useHistory()
    const gettingUserDetails = useSelector((state) => state.Commands.LoginDetails);
    {
        useEffect(() => {
            if (gettingUserDetails.length === 0) {
                history.push("/login")
            }
        })
    }

    const { single_video_id } = useParams();
    const [SingleVideoDetails, setSingleVideoDetails] = useState([])
    const [TrailersData, setTrailersData] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        fetch(`${props.BaseUrl}/single_videos/${single_video_id}`).then((result) => {
            result.json().then((resp) => {
                setSingleVideoDetails(resp)
                setTrailersData(resp)
                setloading(true)
            })
        })
    }, [])
    return (
        <>
            {loading ?
                <>
                    {
                        SingleVideoDetails.map((SingleVideoDetails, i) =>
                            <div className='SingleVideo text-light px-5'>
                                <Link to={`/player/${single_video_id}`} style={{ textDecoration: "none" }}>
                                    <div class="single_video_thumbnail_set row" style={{ backgroundImage: `url(${SingleVideoDetails.movie_cover_image})`, backgroundRepeat: 'no-repeat', backgroundSize: "100% 100%", height: "800px" }}>
                                        <div class="center_logo center_play_logo">
                                            <span style={{ paddingTop: "30px", paddingBottom: "30px", paddingLeft: "35px", paddingRight: "35px", color: "black", fontSize: "26px", fontWeight: "500", textAlign: "center", backgroundColor: "black", height: "100px", width: "100px", borderRadius: "100%" }}><i class="fa fa-play text-white"></i>
                                            </span></div>
                                    </div>
                                </Link>
                                <div className='w-100 pt-3'>
                                    <h6 style={{ fontSize: "24px" }}>{SingleVideoDetails.movie_title}</h6>
                                    <p style={{ fontSize: "10px", marginTop: "-5px", fontSize: "22px" }}>{SingleVideoDetails.movie_released} * {SingleVideoDetails.movie_description}</p>
                                </div>

                                <Trailers TrailersData={TrailersData} />
                                {/* agar video_url pass karana hai toh ye
                                <Trailers video_url = {SingleVideoDetails.movie_trailer} video_cover_img = {SingleVideoDetails.movie_cover_image} />
                                 */}
                            </div>
                        )
                    }
                </>
                :
                <>
                    <div style={{ height: "100vh", overflow: 'hidden' }}>
                        <div class="loading_spinner">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}
export default SingleVideo;
