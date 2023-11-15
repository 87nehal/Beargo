import useFetchApi from "./useFetchApi"

export default () => {
    const getProfileByHandle = async (userHandle) => {
        try {
          const response = await useFetchApi(`/api/profile/${userHandle}`, {
            method: 'GET'
          })
          return response
        } catch (error) {
          throw error
        }
    }
    const getSearchUsers = async (params ={}) => {
      try {
        const response = await useFetchApi(`/api/user/search`, {
          method: 'GET',
          params
        })
        return response
      } catch (error) {
        throw error
      }
    }
    const updateUser = (userId,{ name, username, email, newPassword ,oldPassword, bio }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const body = {
            userId,
          };
    
          if (name) {
            body.name = name;
          }
    
          if (username) {
            body.username = username;
          }
    
          if (email) {
            body.email = email;
          }
    
          if (newPassword) {
            body.newPassword = newPassword;
          }
    
          if (oldPassword) {
            body.oldPassword = oldPassword;
          }
    
          if (bio) {
            body.bio = bio;
          }
    
          const data = await useFetchApi('/api/user/update', {
            method: 'POST',
            body
          });
    
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    };    
    const checkFollowingStatus = async (followerId,followingId)=>{
      const res = await useFetchApi('/api/profile/actions/follows', {
        method: 'POST',
        body: {
          "followerId":followerId,
          "followingId":followingId
        }
      })
      return res
    }
    const followUser = async (followerId,followingId)=>{
      const res = await useFetchApi('/api/profile/actions/follow', {
        method: 'POST',
        body: {
          "followerId":followerId,
          "followingId":followingId
        }
      })
      return res
    }
    const unfollowUser = async (followerId,followingId)=>{
      const res = await useFetchApi('/api/profile/actions/unfollow', {
        method: 'POST',
        body: {
          "followerId":followerId,
          "followingId":followingId
        }
      })
      return res
    }
    const getTopUsersByFollowers = async () => {
      const response = await useFetchApi('/api/user/leaderboard/top-followers', {
        method: 'GET',
      });
      return response;
    };
    
    const getTopUsersByBadges = async () => {
      const response = await useFetchApi('/api/user/leaderboard/top-badges', {
        method: 'GET',
      });
      return response;
    };
    
    const getTopUsersByLikes = async () => {
      const response = await useFetchApi('/api/user/leaderboard/top-likes', {
        method: 'GET',
      });
      return response;
    };
    
    return {
      getProfileByHandle,
      getSearchUsers,
      updateUser,
      checkFollowingStatus,
      followUser,
      unfollowUser,
      getTopUsersByFollowers,
      getTopUsersByBadges,
      getTopUsersByLikes,
    };
}