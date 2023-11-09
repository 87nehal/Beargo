<template>
  <div>
    <div class="flex justify-around w-full">
      <PostItemActionsIcon :color="props.post.userReaction === 'LIKE' ? 'blue' : 'gray'" @click="like(post.id, user.id)" :disabled="deleted || loading">
        <template v-slot:icon="{ classes }">
          <HandThumbUpIcon :class="[classes, props.post.userReaction === 'LIKE' ? 'text-blue-500/60' : 'text-gray-500/60']" />
        </template>
        <template v-slot:default>
          {{ props.post.likesCount }}
        </template>
      </PostItemActionsIcon>
      <PostItemActionsIcon :color="props.post.userReaction === 'DISLIKE' ? 'red' : 'gray'" @click="dislike(post.id, user.id)" :disabled="deleted || loading">
        <template v-slot:icon="{ classes }">
          <HandThumbDownIcon :class="[classes, props.post.userReaction === 'DISLIKE' ? 'text-red-500/60' : 'text-gray-500/60']" />
        </template>
        <template v-slot:default>
          {{ props.post.dislikesCount }}
        </template>
      </PostItemActionsIcon>
      <PostItemActionsIcon color="blue" @click="replyModal" :disabled="deleted">
        <template v-slot:icon="{ classes }">
          <ChatBubbleOvalLeftEllipsisIcon :class="classes" />
        </template>
        <template v-slot:default>
          {{ props.post.repliesCount }}
        </template>
      </PostItemActionsIcon>
      <PostItemActionsIcon color="yellow" @click="sharePost" :disabled="deleted">
        <template v-slot:icon="{ classes }">
          <ShareIcon :class="classes" />
        </template>
      </PostItemActionsIcon>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import { HandThumbUpIcon, HandThumbDownIcon, ChatBubbleOvalLeftEllipsisIcon, ShareIcon } from "@heroicons/vue/24/outline"
const { useAuthUser } = useAuth()
const user = useAuthUser()
const { reactPost, openPostModal } = usePosts()
const emitter = useEmitter()

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
})

let loading = ref(false)

function replyModal() {
  openPostModal(props.post)
}

async function like(postId, userId) {
  loading.value = true
  if (props.post.userReaction === 'LIKE') {
    props.post.userReaction = null
    props.post.likesCount--
  } else {
    await reactPost(postId, userId, 'LIKE')
    if (props.post.userReaction === 'DISLIKE') {
      props.post.dislikesCount--
    }
    props.post.userReaction = 'LIKE'
    props.post.likesCount++
  }
  loading.value = false
}

async function dislike(postId, userId) {
  loading.value = true
  if (props.post.userReaction === 'DISLIKE') {
    props.post.userReaction = null
    props.post.dislikesCount--
  } else {
    await reactPost(postId, userId, 'DISLIKE')
    if (props.post.userReaction === 'LIKE') {
      props.post.likesCount--
    }
    props.post.userReaction = 'DISLIKE'
    props.post.dislikesCount++
  }
  loading.value = false
}

async function sharePost() {
  try {
    await navigator.clipboard.writeText(`${window.location.host}/status/${props.post.id}`)
    emitter.$emit('toast', { message: 'Share link copied.', type: 'alert' });
  } catch (err) {
    emitter.$emit('toast', { message: 'Error, While coping link.', type: 'error' });
  }
}
</script>