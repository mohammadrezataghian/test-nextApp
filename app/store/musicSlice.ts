import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicTrack } from '../types';

// Load from localStorage, defaulting to empty arrays if no data is found
const loadFromLocalStorage = (key: string): string[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

interface MusicState {
  likedTrackIds: string[];
  savedTrackIds: string[];
}

// Initialize state from localStorage
const initialState: MusicState = {
  likedTrackIds: loadFromLocalStorage('likedTrackIds'),
  savedTrackIds: loadFromLocalStorage('savedTrackIds'),
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    toggleLikeTrack: (state, action: PayloadAction<string>) => {
      const trackId = action.payload;
      if (state.likedTrackIds.includes(trackId)) {
        state.likedTrackIds = state.likedTrackIds.filter(id => id !== trackId);
      } else {
        state.likedTrackIds.push(trackId);
      }
      // Save to localStorage after updating the state
      localStorage.setItem('likedTrackIds', JSON.stringify(state.likedTrackIds));
    },
    toggleSaveTrack: (state, action: PayloadAction<string>) => {
      const trackId = action.payload;
      if (state.savedTrackIds.includes(trackId)) {
        state.savedTrackIds = state.savedTrackIds.filter(id => id !== trackId);
      } else {
        state.savedTrackIds.push(trackId);
      }
      // Save to localStorage after updating the state
      localStorage.setItem('savedTrackIds', JSON.stringify(state.savedTrackIds));
    },
  },
});

export const { toggleLikeTrack, toggleSaveTrack } = musicSlice.actions;
export default musicSlice.reducer;
