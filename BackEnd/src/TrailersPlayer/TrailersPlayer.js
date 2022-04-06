import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom'
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";
import screenful from "screenfull";
import Controls from "./components/Controls";
import Footer from "../Footer/Footer";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: "100%",
    position: "relative",
  },

  controlsWrapper: {
    visibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topControls: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  middleControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },

  bottomControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    margin: theme.spacing(1),
  },
  controlIcons: {
    color: "#777",
    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },

  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },

  volumeSlider: {
    width: 100,
  },
}));

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

function TrailersPlayer(props) {
  const history = useHistory()
  const gettingUserDetails = useSelector((state) => state.Commands.LoginDetails);
  {
      useEffect(() => {
          if (gettingUserDetails.length===0) {
              history.push("/login")
          }
      })
  }
  const { single_video_id } = useParams();
  const [SingleVideoDetails, setSingleVideoDetails] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
    fetch(`${props.BaseUrl}/single_videos/${single_video_id}`).then((result) => {
      result.json().then((resp) => {
        setSingleVideoDetails(resp)
        setloading(true)
      })
    })
  }, [])




  const classes = useStyles();
  const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
  const [state, setState] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,
    muted: false,
    played: 0,
    duration: 0,
    playbackRate: 1.0,
    volume: 1,
    loop: false,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    playing,
    light,
    muted,
    loop,
    playbackRate,
    pip,
    played,
    volume,
  } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (changeState) => {
    if (count > 3) {
      controlsRef.current.style.visibility = "hidden";
      count = 0;
    }
    if (controlsRef.current.style.visibility === "visible") {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    console.log({ newValue });
    setState({ ...state, played: parseFloat(newValue / 100) });
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    console.log({ value: e.target });
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleDuration = (duration) => {
    setState({ ...state, duration });
  };

  const handleVolumeSeekDown = (e, newValue) => {
    setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  };
  const handleVolumeChange = (e, newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const toggleFullScreen = () => {
    screenful.toggle(playerContainerRef.current);
  };

  const handleMouseMove = () => {
    console.log("mousemove");
    controlsRef.current.style.visibility = "visible";
    count = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = "hidden";
    count = 0;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === "normal" ? "remaining" : "normal"
    );
  };

  const handlePlaybackRate = (rate) => {
    setState({ ...state, playbackRate: rate });
  };

  const hanldeMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : "00:00";

  const duration =
    playerRef && playerRef.current ? playerRef.current.getDuration() : "00:00";
  const elapsedTime =
    timeDisplayFormat === "normal"
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);


  return (
    <>
      {loading ?
        <>
          {
            SingleVideoDetails.map((SingleVideoDetails, i) =>
              <div className='SingleVideo text-light'>
                <div className="px-5">
                  <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={hanldeMouseLeave}
                    ref={playerContainerRef}
                    className={classes.playerWrapper}
                  >
                    <ReactPlayer
                      ref={playerRef}
                      width="100%"
                      height="700px"
                      url={SingleVideoDetails.movie_trailer}
                      pip={pip}
                      playing={playing}
                      controls={false}
                      light={light}
                      loop={loop}
                      playbackRate={playbackRate}
                      volume={volume}
                      muted={muted}
                      onProgress={handleProgress}
                      config={{
                        file: {
                          attributes: {
                            crossorigin: "anonymous",
                          },
                        },
                      }}
                    />

                    <Controls movie_title={SingleVideoDetails.movie_title}
                      ref={controlsRef}
                      onSeek={handleSeekChange}
                      onSeekMouseDown={handleSeekMouseDown}
                      onSeekMouseUp={handleSeekMouseUp}
                      onDuration={handleDuration}
                      onRewind={handleRewind}
                      onPlayPause={handlePlayPause}
                      onFastForward={handleFastForward}
                      playing={playing}
                      played={played}
                      elapsedTime={elapsedTime}
                      totalDuration={totalDuration}
                      onMute={hanldeMute}
                      muted={muted}
                      onVolumeChange={handleVolumeChange}
                      onVolumeSeekDown={handleVolumeSeekDown}
                      onChangeDispayFormat={handleDisplayFormat}
                      playbackRate={playbackRate}
                      onPlaybackRateChange={handlePlaybackRate}
                      onToggleFullScreen={toggleFullScreen}
                      volume={volume}
                    />
                  </div>

                  <canvas ref={canvasRef} />
                  <h3 className="text-white" style={{ marginTop: "-150px" }}>{SingleVideoDetails.movie_title} - Promo</h3>
                  <h5 className="text-white">{SingleVideoDetails.movie_released} * <span className="text-primary">{SingleVideoDetails.movie_tags}</span></h5>
                  <h5 className="text-white mb-5">{SingleVideoDetails.movie_description}</h5>
                </div>
              </div>

            )
          }
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

export default TrailersPlayer;