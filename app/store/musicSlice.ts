import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicTrack } from '../types';

interface MusicState {
  likedTracks: MusicTrack[];
  savedTracks: MusicTrack[];
}

const initialState: MusicState = {
  likedTracks: [],
  savedTracks: [],
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    toggleLikeTrack: (state, action: PayloadAction<MusicTrack>) => {
        const track = action.payload;
        const exists = state.likedTracks.find((item) => item.id === track.id);
      
      if (exists) {
        // If track exists, remove it from likedTracks
        state.likedTracks = state.likedTracks.filter((item) => item.id !== track.id);
      } else {
        // Otherwise, add it to likedTracks
        state.likedTracks.push(track);
      }
      },
      toggleSaveTrack: (state, action: PayloadAction<MusicTrack>) => {
        const track = action.payload;
        const exists = state.savedTracks.find((item) => item.id === track.id);
  
        if (exists) {
          state.savedTracks = state.savedTracks.filter((item) => item.id !== track.id);
        } else {
          state.savedTracks.push(track);
        }
      },
    },
});

export const {toggleLikeTrack, toggleSaveTrack } = musicSlice.actions;
export default musicSlice.reducer;
