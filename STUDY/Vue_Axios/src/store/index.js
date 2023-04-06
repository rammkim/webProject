import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';
import axios from 'axios';

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
        login({ dispatch }, loginObj) {
            // Login.vue 에서 @click="login({ email, password })" email, password 값이 loginObj로 전달됨 (loginObj = {email, password})

            // 로그인 -> 토큰 반환
            axios
                .post('https://reqres.in/api/login', loginObj) // post 방식에 두번째 인자는 parm를 넣어줄 수 있음 (body)
                .then((res) => {
                    // 성공 시 토큰 값 돌아옴 (실제로는 user_id 값을 받아옴)
                    // 토큰을 헤더에 포함시켜서 유저 정보를 요청
                    let token = res.data.token;
                    // 토큰을 로컬스토리지에 저장
                    console.log(loginObj);
                    localStorage.setItem('access_token', token); // 'access_token' 이라는 이름으로 token을 저장함
                    dispatch('getMemberInfo');

                    if (!token === null) {
                        alert('토큰 있음');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        logout({ commit }) {
            commit('logout');
            router.push({ name: 'home' });
        },
        getMemberInfo({ commit }) {
            // 로컬 스토리지에 저장되어 있는 토큰을 불러옴
            let token = localStorage.getItem('access_token');

            let config = {
                // 헤더값 설정해줄 수 있음
                headers: {
                    'access-token': token
                }
            };
            // 반환된 토큰 -> user 정보를 반환
            // 새로 고침 -> 토큰만 가지고 user 정보를 요청
            axios
                .get('https://reqres.in/api/users/2', config) // get 방식은 두번째 인자로 보안에 관련된 config가 옴
                .then((response) => {
                    let userInfo = {
                        id: response.data.data.id,
                        first_name: response.data.data.first_name,
                        last_name: response.data.data.last_name,
                        avatar: response.data.data.avatar
                    };
                    commit('loginSuccess', userInfo);
                })
                .catch(() => {
                    // 에러일때 반환
                    alert('이메일과 비밀번호를 확인하세요');
                    // console.log(error);
                })
                .finally(() => {
                    // console.log('test');
                    // 모든 경우에 반환
                });
        }
    },
    modules: {}
});
