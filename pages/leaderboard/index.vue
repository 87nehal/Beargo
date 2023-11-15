<template>
  <MainSection title="Leaders" :loading="loading">
    <Head>
      <Title>Leaders</Title>
    </Head>
    <div class="flex font-semibold dark:text-white p-3 justify-center">
      <div 
        v-for="(tabName, index) in tabNames" 
        :key="index" 
        @click="tab = index" 
        :class="['cursor-pointer px-4 py-2 rounded-md item', tab === index ? 'bg-prime-0' : '']"
      >
        {{ tabName }}
      </div>
    </div>
    <div class="m-2">
        <div v-if="tab === 0">
          <!-- Top Users by Likes -->
          <UserItem v-for="user in topUsersByLikes.users" :key="user.id" :user="user" />
        </div>
    
        <div v-if="tab === 1">
        <!-- Top Users by Followers -->
        <div>
          <UserItem v-for="user in topUsersByFollowers.users" :key="user.id" :user="user" />
        </div>
      </div>
    
      <div v-if="tab === 2">
        <!-- Top Users by Badges -->
        <div>
          <UserItem v-for="user in topUsersByBadges.users" :key="user.id" :user="user" />
        </div>
      </div>  
    </div>
  </MainSection>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const {getTopLikes, getTopFollows, getTopBadges} = useExtra()

const topUsersByLikes = ref([]);
const topUsersByFollowers = ref([]);
const topUsersByBadges = ref([]);
const tab = ref(0); // Default tab
const tabNames = ['Top Users by Likes', 'Top Users by Followers', 'Top Users by Badges'];

onMounted(async () => {
  const likesData = await getTopLikes()
  const followersData = await getTopFollows()
  const badgesData = await getTopBadges()

  topUsersByLikes.value = await likesData;
  topUsersByFollowers.value = await followersData;
  topUsersByBadges.value = await badgesData;
});
</script>