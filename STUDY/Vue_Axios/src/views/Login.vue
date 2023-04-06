<template>
    <v-container fill-height style="max-width: 450px">
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-alert class="mb-3" dense outlined type="error" :value="isLoginError">아이디와 비밀번호를 확인해주세요.</v-alert>
                <v-alert class="mb-3" dense outlined type="success" :value="isLogin">로그인이 완료 되었습니다.</v-alert>
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>로그인</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                        <v-text-field v-model="email" label="이메일을 입력하세요"></v-text-field>
                        <v-text-field v-model="password" type="password" label="패스워드를 입력하세요"></v-text-field>
                        <v-btn color="#BBDEFB" depressed block large @click="login({ email, password })">로그인</v-btn>
                        <!-- <v-btn @click="getTest">get 테스트</v-btn>
                        <v-btn @click="postTest">post 테스트</v-btn> -->
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import axios from 'axios';

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null
        };
    },
    computed: {
        ...mapState(['isLogin', 'isLoginError'])
    },
    methods: {
        ...mapActions(['login'])
        // // get 방식
        // getTest() {
        //     axios
        //         .get('https://reqres.in/api/users?page=2')
        //         .then((res) => {
        //             // 성공일때 반환
        //             console.log(res);
        //         })
        //         .catch((err) => {
        //             // 에러일때 반환
        //             console.log(err);
        //         })
        //         .finally(() => {
        //             console.log('test');
        //             // 모든 경우에 반환
        //         });

        //     // function(res) 라고 사용하면 function 내부를 가르키기 때문에 지양하는 편이 좋음
        //     // -> 받아온 데이터를 data()에 다시 할당을 해줘야하기 떄문에 (화살표 함수 사용 지향)
        // },

        // // post 방식
        // postTest() {
        //     axios
        //         .post('https://reqres.in/api/register', {
        //             email: 'eve.holt@reqres.in',
        //             password: 'pistol'
        //         })
        //         .then((res) => {
        //             console.log(res);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // }
    }
};
</script>
