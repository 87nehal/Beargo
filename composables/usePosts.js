import useFetchApi from "./useFetchApi"

export default () => {
  const postPost = (formData) => {
    const form = new FormData()

    form.append('text', formData.text)
    form.append('replyTo', formData.replyTo)

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append('media_file_' + index, mediaFile)
    })
    return useFetchApi('/api/user/posts', {
      method: 'POST',
      body: form
    })
  }

  const getHomePosts = async (userId, page = 1) => {
    const skip = (page - 1) * 10
    try {
      const response = await useFetchApi(`/api/posts?userId=${userId}&skip=${skip}`, {
        method: 'GET'
      })
      return response
    } catch (error) {
      throw error
    }
  }

  const getSearchPosts = async (params ={}) => {
    try {
      const response = await useFetchApi(`/api/posts/search`, {
        method: 'GET',
        params
      })
      return response
    } catch (error) {
      throw error
    }
  }
  
  const getTrendingPosts = async () => {
    try {
      const response = await useFetchApi(`/api/posts/trends`, {
        method: 'GET'
      })
      return response
    } catch (error) {
      throw error
    }
  }

  const getPostById = async (postId) => {
    try {
      const response = await useFetchApi(`/api/posts/${postId}`, {
        method: 'GET'
      })
      return response
    } catch (error) {
      throw error
    }
  }

  const getPostsByUser = async (username) => {
    try {
      const response = await useFetchApi(`/api/posts/user/${username}`, {
        method: 'GET'
      })
      return response
    } catch (error) {
      throw error
    }
  }

  const reactPost = async (postId, userId, type) => {
    await useFetchApi(`/api/posts/actions/react`, {
      method: 'POST',
      body: {
        "postId": postId,
        "userId": userId,
        "type": type
      }
    })
  }

  const deletePost = async (postId)=>{
    useFetchApi('/api/posts/actions/delete', {
      method: 'POST',
      body: {
        "postId":postId
      }
    })
  }

  const usePostModal = () => useState ('post_modal',()=>false)

  const closePostModal = () =>{
    const postModal = usePostModal()
    postModal.value=false
  }

  const useReplyPost = () => useState('reply_post',()=>null)

  const setReplyTo = (post) => {
    const replyPost = useReplyPost()
    replyPost.value = post
  }

  const openPostModal = (post = null) =>{
    const postModal = usePostModal()
    postModal.value=true

    setReplyTo(post)
  }

  const checkToxicity = async (text) => {
    const response = await useFetchApi(`/api/perspective`, {
      method: 'POST',
      body: {
        "text": text
      }
    })
    return response
  }

  return {
    postPost,
    getHomePosts,
    getSearchPosts,
    getTrendingPosts,
    getPostById,
    getPostsByUser,
    reactPost,
    deletePost,
    usePostModal,
    closePostModal,
    openPostModal,
    useReplyPost,
    checkToxicity
  }
}
