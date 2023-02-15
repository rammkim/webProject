<template>
    <v-app id="inspire">
        <!-- nav -->
        <v-navigation-drawer v-model="drawer" app>
            <v-list v-bind:style="{ padding: 0 }">
                <v-list-item-group>
                    <!-- <v-list-item v-for="(item, i) in menuitem" :key="i" router :to="{ name: item.link }">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item> -->
                    <v-list-item router :to="{ name: 'home' }">
                        <v-list-item-icon>
                            <v-icon>home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="!isLogin" router :to="{ name: 'login' }">
                        <v-list-item-icon>
                            <v-icon>login</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>로그인</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-else router :to="{ name: 'mypage' }">
                        <v-list-item-icon>
                            <v-icon>account_circle</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>마이페이지</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <!-- app-bar -->
        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu v-if="isLogin" offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn dark color="#000" icon v-bind="attrs" v-on="on"><span class="material-icons"> drag_indicator </span></v-btn>
                </template>
                <v-list>
                    <v-list-item router :to="{ name: 'mypage' }">
                        <v-list-item-title>마이페이지</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$store.dispatch('logout')">
                        <v-list-item-title>로그아웃</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn v-else router :to="{ name: 'login' }"> Log In </v-btn>
        </v-app-bar>

        <!-- content -->
        <v-main>
            <router-view />
        </v-main>

        <!-- footer -->
        <v-footer app>
            <span class="black--text">&copy; 2023 Boram vue study</span>
        </v-footer>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'App',

    data() {
        return {
            drawer: null
            // menuitem: [
            //     {
            //         icon: 'home',
            //         text: 'home',
            //         link: 'home'
            //     },
            //     {
            //         icon: 'login',
            //         text: '로그인',
            //         link: 'login'
            //     },
            //     {
            //         icon: 'account_circle',
            //         text: '마이페이지',
            //         link: 'mypage'
            //     }
            // ]
        };
    },
    computed: {
        ...mapState(['isLogin'])
    }
};
</script>
