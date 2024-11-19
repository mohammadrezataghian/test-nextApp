import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MusicTrack } from '../types';

interface MusicState {
  likedTrackIds: string[]
  savedTrackIds: string[]
}

const initialState: MusicState = {
  likedTrackIds: [],
  savedTrackIds: [],
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
      },
      toggleSaveTrack: (state, action: PayloadAction<string>) => {
        const trackId = action.payload;
        if (state.savedTrackIds.includes(trackId)) {
            state.savedTrackIds = state.savedTrackIds.filter(id => id !== trackId);
          } else {
            state.savedTrackIds.push(trackId);
          }
      },
    },
});

export const {toggleLikeTrack, toggleSaveTrack } = musicSlice.actions;
export default musicSlice.reducer;
