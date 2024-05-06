import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    id: "",
    email: "",
    photoURL: "",
    displayName: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //구글 로그인을 했을 때 구글에서 보내준 유저 정보를 저장하는 객체
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.pthotoURL = action.payload.phothURL;
            state.displayName = action.payload.displayName;
        },

        //로그아웃했을 때 객체 초기화
        removeUser: (state) => {
            state.id = "";
            state.email = "";
            state.pthotoURL = "";
            state.displayName = "";
        }
    }
})

//setUser, removeUser 도 다른컴포넌트에서 사용가능하게 export 
export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
