import React from 'react'
import './Trailers.css'
import { Link } from 'react-router-dom'


function Trailers(props) {
    return (
        <>
            {
                (props.TrailersData).map((TrailersData, i) =>
                    <>
                    <div className='Trailers text-light pt-5 zoom_on_hover_effect_for_trailers'>
                        <h4 className='text-white'>Trailers & Extras</h4>
                        <div style={{ height: "275px", width: "206px" }}>
                            <Link to={`/trailer_player/${TrailersData.movie_id}`}>
                                <div className="trailers_video_thumbnail">
                                    <img className="d-block" src={TrailersData.movie_cover_image} alt="#" style={{ height: "275px", width: "206px", borderRadius: "10px" }} />
                                    <div className='w-100 px-2 trailers_video_description'>
                                        <h6>{TrailersData.movie_title}</h6>
                                        <p style={{ fontSize: "10px", marginTop: "-5px" }}>{TrailersData.movie_released} * {TrailersData.movie_description}</p>
                                        <h6 style={{ color: "white", fontSize: "10px" }}><i className="fa fa-play"></i> WATCH MOVIE</h6><br />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div> <br />
                    </>
                )
            }
        </>
    );
}
export default Trailers;
