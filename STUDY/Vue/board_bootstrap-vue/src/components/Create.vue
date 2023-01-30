<template>
    <div>
        <b-input v-model="subject" placeholder="제목을 입력해 주세요"></b-input>
        <b-form-textarea v-model="context" placeholder="내용을 입력해 주세요" rows="3" max-rows="6"></b-form-textarea>
        <b-button @click="updateMode ? updateContent() : uploadContent()">저장</b-button>
        <b-button @click="cancle">취소</b-button>
    </div>
</template>
<script>
import data from '@/data';

export default {
    name: 'Create',
    data() {
        return {
            subject: '',
            context: '',
            userId: 1,
            createdAt: '2023-01-19 11:32:42',
            updateAt: null,
            updateObject: null,
            updateMode: this.$route.params.contentId > 0 ? true : false
            // 글쓰기 일때는 params 값이 없으니 uploadContent()를 실행, 수정일때는(params 값 존재) updateContent()를 실행
        };
    },
    created() {
        // 수정을 눌렀을 때 객체 title context 를 넣어줌
        if (this.$route.params.contentId > 0) {
            const contentId = Number(this.$route.params.contentId);
            this.updateObject = data.Content.filter((item) => item.content_id === contentId)[0];
            this.subject = this.updateObject.title;
            this.context = this.updateObject.context;
        }
    },
    methods: {
        // 글쓰기 - 저장
        uploadContent() {
            let items = data.Content.sort((a, b) => {
                return b.content_id - a.content_id;
            });
            // 새 글의 content_id 를 구하기 위해 내림차순으로 정렬

            const content_id = items[0].content_id + 1; // 내림차순 정렬 한 후 index[0]의 content_id 에 +1 한 값을 변수에 넣어줌 (새 글의 content_id)

            data.Content.push({
                content_id: content_id,
                user_id: this.userId,
                title: this.subject,
                context: this.context,
                create_at: this.createdAt,
                updated_at: null
            });
            this.$router.push({
                path: '/board/free'
            });
        },
        // 수정 - 저장
        updateContent() {
            this.updateObject.title = this.subject;
            this.updateObject.context = this.context;
            this.$router.push({
                path: '/board/free/'
            });
        },
        cancle() {
            this.$router.push({
                path: '/board/free'
            });
        }
    }
};
</script>
