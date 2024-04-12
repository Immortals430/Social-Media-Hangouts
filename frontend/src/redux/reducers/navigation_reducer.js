import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    path: "post",
    loading: ['posts', 'friends'],
    mobileAside: false
}

const navigateSlice = createSlice({
    name: 'navigate',
    initialState,
    reducers: {
        SET_PATH: (state, action) => {
            state.path = action.payload
        },
        START_LOADING: (state, action) => {
            state.loading = [...state.loading, action.payload]
        },
        STOP_LOADING: (state, action) => {
            const index = state.loading.indexOf(action.payload)
            state.loading.splice(index, 1)
        },
        SET_MOBILE_ASIDE: (state, action) => {
            state.mobileAside = action.payload
        }
    }
})



export const {SET_PATH, START_LOADING,STOP_LOADING, SET_MOBILE_ASIDE} = navigateSlice.actions
export const navigateReducer = navigateSlice.reducer
export const navigateSelector = state => state.navigateReducer
