<template>
    <div>
        <b-table striped hover :items="items" :per-page="perPage" :current-page="currentPage" :fields="fields" @row-clicked="rowClick"></b-table>
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="center" aria-controls="my-table"></b-pagination>
        <b-button @click="writeContent">글쓰기</b-button>
    </div>
</template>
<script>
import data from '@/data';

export default {
    name: 'Board',
    data() {
        let dowmItems = data.Content.sort((a, b) => {
            return b.content_id - a.content_id;
        });
        // sort 는 인자로 함수를 받음
        // 오름차순 정렬 a-b / 내림차순 정렬 b-a
        dowmItems = dowmItems.map((contentItem) => {
            return { ...contentItem, user_name: data.User.filter((userItem) => userItem.user_id === contentItem.user_id)[0].name };
        });
        // Content 에 user_name 을 map함수를 통해 추가해줌 (data User 필터함수를 돌며 user_id 가 일치하는 항목을 찾아서 추가)
        return {
            currentPage: 1,
            perPage: 10,
            fields: [
                {
                    key: 'content_id',
                    label: '글번호'
                },
                {
                    key: 'title',
                    label: '제목'
                },
                {
                    key: 'create_at',
                    label: '작성일'
                },
                {
                    key: 'user_name',
                    label: '글쓴이'
                }
            ],
            // fields: 보여주고 싶은 컬럼만 문자열로 넣어주기, key 값을 label 을 통해 원하는 텍스트로 변경해서 나타내줄 수 있음
            items: dowmItems
        };
    },
    methods: {
        rowClick(item, index, e) {
            this.$router.push({
                path: `/board/free/detail/${item.content_id}`
            });
        },
        // item: 클릭한 row 데이터, index: 클릭한 row index, event: event
        writeContent() {
            this.$router.push({
                path: '/board/free/create'
            });
        }
    },
    computed: {
        rows() {
            return this.items.length;
            // 게시물의 갯수 (computed 를 사용하여 게시물의 갯수가 변경될때만 호출)
        }
    }
    // computed: 계산해야하는 목표 데이터를 정의 하는 '선언형' 프로그래밍 방식,
    // 저장된 결과(캐싱)를 반환하므로 종족 대상의 변경이 일어나기 전까지 호출 되지 않음 (게시물의 갯수가 변경되지 않으면 호출 되지 않음)
};
</script>
