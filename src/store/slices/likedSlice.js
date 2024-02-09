import { createSlice } from "@reduxjs/toolkit";

const likedSlice = createSlice({
    name: 'likedSlice',
    initialState: {
        liked: []
    },
    reducers: {
        addToLiked: (state, action) => {
            const isFindItem = state.liked.find(item => item.id === action.payload.id);
            if (!isFindItem) {
                const addedAtString = new Date().toISOString();
                state.liked.push({ ...action.payload, addedAt: addedAtString });
            }
        },
    }
});

export default likedSlice.reducer;
export const { addToLiked } = likedSlice.actions;