'use client';
import React, { useState, useRef } from 'react';
import '../../MusicCard.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { HiOutlineBookmark } from 'react-icons/hi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleLikeTrack, toggleSaveTrack } from '../../store/musicSlice';
import { MusicTrack } from '../../types';

interface ProfileCardProps {
  tracks: MusicTrack[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ tracks }) => {
  const [currentPlayingTrackId, setCurrentPlayingTrackId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const dispatch = useDispatch();

  const likedTrackIds = useSelector((state: RootState) => state.music.likedTrackIds);
  const savedTrackIds = useSelector((state: RootState) => state.music.savedTrackIds);

  const isLiked = (trackId: string) => likedTrackIds.includes(trackId);
  const isSaved = (trackId: string) => savedTrackIds.includes(trackId);

  const handlePlayPause = (trackId: string) => {
    const currentAudio = audioRefs.current[trackId];
    if (!currentAudio) return;

    if (currentPlayingTrackId === trackId) {
      currentAudio.pause();
      setCurrentPlayingTrackId(null);
    } else {
      if (currentPlayingTrackId) {
        const previousAudio = audioRefs.current[currentPlayingTrackId];
        previousAudio?.pause();
        previousAudio && (previousAudio.currentTime = 0);
      }
      currentAudio.play();
      setCurrentPlayingTrackId(trackId);
    }
  };

  const handleLike = (trackId: string) => {
    dispatch(toggleLikeTrack(trackId));
  };

  const handleSave = (trackId: string) => {
    dispatch(toggleSaveTrack(trackId));
  };

  return (
    <>
      {tracks.length > 0 ? (
        tracks.map((track) => (
          <div key={track.id} className="music-card">
            <img src={track.cover} alt={track.title} className="music-cover" />
            <h1 className="music-title">{track.title}</h1>

            <div className="custom-audio-player mt-4">
              <button onClick={() => handlePlayPause(track.id)} className="play-button">
                {currentPlayingTrackId === track.id ? <CiPause1 /> : <CiPlay1 />}
              </button>
            </div>

            <audio
              ref={(el) => (audioRefs.current[track.id] = el)}
              src={track.src}
              onEnded={() => setCurrentPlayingTrackId(null)}
              style={{ display: 'none' }}
            ></audio>

            <div className="action-buttons mt-3">
              <button onClick={() => handleLike(track.id)} className="like-button">
                {isLiked(track.id) ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
              </button>
              <button onClick={() => handleSave(track.id)} className="save-button">
                {isSaved(track.id) ? <BsFillBookmarkFill style={{ color: '#2b2b2b' }} /> : <HiOutlineBookmark />}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No liked tracks</p>
      )}
    </>
  );
};

export default ProfileCard;
