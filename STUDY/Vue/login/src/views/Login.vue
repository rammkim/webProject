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
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
    }
};
</script>
