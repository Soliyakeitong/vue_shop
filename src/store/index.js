import { createStore } from 'vuex'

const store = createStore({
    state: {
        // 用户信息
        userInfo: null
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    }
})

export default store