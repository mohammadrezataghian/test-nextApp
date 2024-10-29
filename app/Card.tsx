'use client';
import React, { useRef, useState, useEffect } from 'react';
import './MusicCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { HiOutlineBookmark } from 'react-icons/hi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { CiPlay1,CiPause1 } from "react-icons/ci";

const MusicCard = () => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Update duration when audio metadata is loaded
      const updateDuration = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener('loadedmetadata', updateDuration);
      return () => {
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  // const handleProgressClick = (e) => {
  //   if (duration <= 0) return; // Check if duration is still null
  
  //   const progressBar = progressBarRef.current;
  //   const rect = progressBar.getBoundingClientRect();
  //   const clickX = e.clientX - rect.left; // Click position relative to the left edge of the progress bar
  //   const width = rect.width; // Width of the progress bar
  //   const newTime = (clickX / width) * duration; // Calculate new time based on click position
  
  //   // Ensure the new time is within the bounds of the audio duration
  //   if (newTime >= 0 && newTime <= duration) {
  //     audioRef.current.currentTime = newTime; // Set the audio current time
  //     setCurrentTime(newTime); // Update current time state
  //     setProgress((newTime / duration) * 100); // Update progress state
  //   }
  // };
;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="music-card">
      <img src="/images/card-media/folder.jpg" alt="Music Cover" className="music-cover" />
      <h1 className="music-title">Song Title - Singer Name</h1>

      <div className="custom-audio-player mt-4">
        <button onClick={handlePlayPause} className="play-button">
          {isPlaying ? <CiPause1/> : <CiPlay1/>}
        </button>

        <div
          className="progress-bar"
          ref={progressBarRef}
          // onClick={handleProgressClick}
          // style={{ cursor: 'pointer' }} // Change cursor on hover
        >
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="timer">
          <span>{formatTime(currentTime)}</span>  
          {/* <span>{formatTime(duration)}</span> */}
        </div>
      </div>

      <audio
        ref={audioRef}
        src="/foo.mp3" // Ensure this path is correct
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          console.log("Audio ended.");
        }}
        style={{ display: 'none' }}
      ></audio>

      <div className="action-buttons">
        <button onClick={handleLike} className="like-button">
          {isLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
        </button>
        <button onClick={handleSave} className="save-button">
          {isSaved ? <BsFillBookmarkFill style={{ color: '#2b2b2b' }} /> : <HiOutlineBookmark />}
        </button>
      </div>
    </div>
  );
};

export default MusicCard;
