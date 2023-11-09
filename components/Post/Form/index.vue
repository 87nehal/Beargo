<template>
    <div>
        <div v-if="loading" class="flex items-center justify-center py-6">
            <UISpinner/>
        </div>
        <div v-else>
            <PostFormInput :user="props.user" :placeholder="props.placeholder" @onSubmit="handleFormSubmit"/>
        </div>
    </div>
</template>
<script setup>
const loading = ref(false)
const emits = defineEmits(['onSuccess'])
const {postPost,checkToxicity} = usePosts()
const props = defineProps({
    user:{
        type: Object,
        required: true
    },
    placeholder:{
        type: String,
        default: "What's happening"
    },
    replyTo:{
        type: Object,
        default:null
    }
})

async function handleFormSubmit (data){
  loading.value = true
  try {
    const toxicityResponse = await checkToxicity(data.text);
    const { toxicityScore, identityAttackScore, profanityScore, threatScore, sexuallyExplicitScore } = toxicityResponse;
    console.log("toxicityScore:", toxicityScore);
    console.log("identityAttackScore:", identityAttackScore);
    console.log("profanityScore:", profanityScore);
    console.log("threatScore:", threatScore);
    console.log("sexuallyExplicitScore:", sexuallyExplicitScore);
    if (toxicityScore > 0.7 || identityAttackScore > 0.7 || profanityScore > 0.7 || threatScore > 0.7 || sexuallyExplicitScore > 0.7) {
      alert('Your text contains toxic content. Please revise it before posting.')
    } else {
      try {
        const response = await postPost({
          text: data.text,
          mediaFiles: data.mediaFiles,
          replyTo: props.replyTo?.id
        })
        emits('onSuccess',response.post)
      } catch (error) {
        alert("Explicit image detected.")
      }
    }
  } catch (error) {
    console.log(error)
  } finally{
    loading.value = false
  }
}

</script>
