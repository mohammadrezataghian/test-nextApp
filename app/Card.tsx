'use client';
import React, { useRef, useState, useEffect } from 'react';
import './MusicCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { HiOutlineBookmark } from 'react-icons/hi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { CiPlay1, CiPause1 } from "react-icons/ci";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import {  toggleLikeTrack, toggleSaveTrack } from './store/musicSlice';
import { MusicTrack } from './types';

interface MusicCardProps {
  track: MusicTrack;
}

const MusicCard = () => {
  const [musicData, setMusicData] = useState<MusicTrack[]>([]);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await axios.get('/api/cards');
        setMusicData(response.data);
        console.log('Fetched Tracks:', response.data);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };
    fetchMusicData();
  }, []);

  return (
    <>
      {musicData.map((track) => (
        <MusicCardItem key={track.id} track={track} />
      ))}
    </>
  );
};



const MusicCardItem: React.FC<MusicCardProps> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const dispatch = useDispatch();
  const likedTrackIds = useSelector((state: RootState) => state.music.likedTrackIds);
  const savedTrackIds = useSelector((state: RootState) => state.music.savedTrackIds);

  const isLiked = likedTrackIds.includes(track.id)
  const isSaved = savedTrackIds.includes(track.id)

  const handleLike = () => {
    dispatch(toggleLikeTrack(track.id));
  };

  const handleSave = () => {
    dispatch(toggleSaveTrack(track.id));
  };
  // const [trackState, setTrackState] = useState({
  //   isLiked: false,
  //   isSaved: false,
  // });

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
      audio?.pause();
    } else {
      audio?.play();
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

  // const handleLike = () => {
  //   setTrackState((prevState) => ({
  //     ...prevState,
  //     isLiked: !prevState.isLiked,
  //   }));
  // };

  // // Handle save state toggle
  // const handleSave = () => {
  //   setTrackState((prevState) => ({
  //     ...prevState,
  //     isSaved: !prevState.isSaved,
  //   }));
  // };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="music-card">
      <img src={track.cover} alt={track.title} className="music-cover" />
      <h1 className="music-title">{track.title}</h1>

      <div className="custom-audio-player mt-4">
        <button onClick={handlePlayPause} className="play-button">
          {isPlaying ? <CiPause1 /> : <CiPlay1 />}
        </button>

        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="timer">
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.src} 
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
