// Fetch the posts API 

// Create post method that will fetch call to create API
const create = async (params, credentials, post) => {
    try {
      let response = await fetch('/api/posts/new/'+ params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: post
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  // Fetch the related posts by user and display these posts in the profile view using list-posts-by-user API
  const listByUser = async (params, credentials) => {
    try {
      let response = await fetch('/api/posts/by/'+ params.userId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  // Fetch the related posts and display these posts in the newsfeed view
  const listNewsFeed = async (params, credentials, signal) => {
    try {
      let response = await fetch('/api/posts/feed/'+ params.userId, {
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })    
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  // Remove post by the user
  const remove = async (params, credentials) => {
    try {
      let response = await fetch('/api/posts/' + params.postId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  // Will be used when user clciks like button. Will fetch the like API
  const like = async (params, credentials, postId) => {
    try {
      let response = await fetch('/api/posts/like/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({userId:params.userId, postId: postId})
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  // Will be used when user clicks on unlike button. Will fetch unlike API
  const unlike = async (params, credentials, postId) => {
    try {
      let response = await fetch('/api/posts/unlike/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({userId:params.userId, postId: postId})
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  // Fetch Comment method which takes current user's ID, post ID, and comment oject from view and sends it to add comment request
  const comment = async (params, credentials, postId, comment) => {
    try {
      let response = await fetch('/api/posts/comment/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({userId:params.userId, postId: postId, comment: comment})
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  // Fetch uncomment method 
  const uncomment = async (params, credentials, postId, comment) => {
    try {
      let response = await fetch('/api/posts/uncomment/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({userId:params.userId, postId: postId, comment: comment})
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  
  export {
    listNewsFeed,
    listByUser,
    create,
    remove,
    like,
    unlike,
    comment,
    uncomment
  }