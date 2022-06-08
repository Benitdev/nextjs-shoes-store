import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// declaring the types for our state
export type HeaderState = {
    headerBlur: boolean
    isScroll: boolean
    toggleLogin: boolean
    isLoading: boolean
}

const initialState: HeaderState = {
    headerBlur: false,
    isScroll: false,
    toggleLogin: false,
    isLoading: false,
}

export const headerSlice = createSlice({
    name: 'headerState',
    initialState,
    reducers: {
        isScrollDown: (state) => {
            state.isScroll = true
        },
        isScrollUp: (state) => {
            state.isScroll = false
        },
        setHeaderBlur: (state, action) => {
            state.headerBlur = action.payload
        },
        setToggleLogin: (state, action) => {
            state.toggleLogin = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
    },
})
export const {
    isScrollDown,
    isScrollUp,
    setHeaderBlur,
    setToggleLogin,
    setIsLoading,
} = headerSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default headerSlice.reducer
