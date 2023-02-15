import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // data() 와 유사
        userInfo: null,
        allUsers: [
            { id: 1, name: 'boram', email: 'qhfka@gmail.com', password: '123456' },
            { id: 2, name: 'rami', email: 'ramram@gmail.com', password: '654321' }
        ],
        isLogin: false,
        isLoginError: false
    },
    getters: {
        // computed 와 유사 (계산된 데이터, 속성을 만드는 기능)
        // 모든 Vue 컴포넌트단에서 동일하게 수행해야 할 경우 코드를 매번 작성해줘야 하는 번거로움이 있으므로 (리소스 비용 큼)
        // => Vuex 내에서 getters 라는 속성으로 미리 연산을 해놓는 것
        // 데이터 가공이 완료된 상태인 데이터를 호출만 하면 모든 Vue 컴포넌트단에서 연산을 실행시켜야하는 리소스 비용을 한번으로 줄여줌
    },
    mutations: {
        // methods 속성과 유사
        // Vuex 내에 선언된 state를 변경시켜주는 기능을 가지고 있음
        // (Vuex 에서 선언된 state는 mutations에서만 변경이 가능)
        // store.commit('뮤테이션_이름', payload)

        // 로그인이 성공했을 때
        loginSuccess(state, payload) {
            state.isLogin = true;
            state.isLoginError = false;
            state.userInfo = payload;
        },

        // 로그인이 실패했을 때
        loginError(state) {
            state.isLogin = false;
            state.isLoginError = true;
        },

        // 로그아웃
        logout(state) {
            state.isLogin = false;
            state.isLoginError = false;
            state.userInfo = null;
        }
    },
    actions: {
        // methods 속성과 유사
        // 하지만 mutations 와의 차이점 : state를 변경시키는 기능을 하진 않고
        // 전체적인 큰 흐름의 API 호출이나 비동기적 데이터를 처리해야하는 로직을 다룰 때, 일련의 과정을 다룰 때 주로 사용
        // store.dispatch('액션_이름', payload)

        // 로그인 시도
        // login(context) {
        //     context.commit;
        // },
        login({ state, commit }, loginObj) {
            // 전체 유저에서 해당 이메일로 유저를 찾는다.
            let selectedUser = null;

            // 아이디 비번 존재 유무 확인
            state.allUsers.forEach((user) => {
                if (user.email == loginObj.email) {
                    selectedUser = user;
                }
            });

            if (selectedUser == null || selectedUser.password !== loginObj.password) {
                commit('loginError');
            } else {
                commit('loginSuccess', selectedUser);
                router.push({ name: 'mypage' });
            }
        },
        logout({ commit }) {
            commit('logout');
            router.push({ name: 'home' });
        }
    },
    modules: {}
});
