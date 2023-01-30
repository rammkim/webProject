<template>
    <div>
        <!-- 존재하는 댓글 보여주는 영역 -->
        <div :key="comment.comment_id" v-for="comment in comments">
            <CommentListItem :commentObj="comment" />
        </div>
        <!-- 댓글 입력 영역 -->
        <CommentCreate :contentId="contentId" :reloadComments="reloadComments" />
    </div>
</template>
<script>
import data from '@/data';
import CommentListItem from './CommentListItem.vue';
import CommentCreate from './CommentCreate.vue';

export default {
    name: 'CommentList',
    components: {
        CommentListItem,
        CommentCreate
    },
    props: {
        contentId: Number
    },
    data() {
        return {
            comments: data.Comment.filter((item) => item.content_id === this.contentId)
        };
    },
    methods: {
        // 댓글 작성 후 바로 작성한 댓글이 보이기 위해 comments 값을 한번 더 정의해줌
        reloadComments() {
            this.comments = data.Comment.filter((item) => item.content_id === this.contentId);
        }
    }
};
</script>
