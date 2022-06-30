import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import postCtrl from '../controllers/post.controller'
import auth from '../../client/auth/auth-helper'

const router = express.Router()

// Post route that will receive the request for retrieving Newsfeed posts for a user
router.route('/api/posts/feed/:userId')
    .get(authCtrl.requireSignin, postCtrl.listNewsFeed)

// Post route that recieve a list of posts by a certain user
router.route('/api/posts/by/:userId')
    .get(authCtrl.requireSignin, postCtrl.listByUser)

// Post route to create a post
router.route('/api/posts/new/:userId')
    .post(authCtrl.requireSignin, postCtrl.create)

// Post route to retrieve a post's photo
router.route('/api/posts/photo/:postId').get(postCtrl.photo)

// Post route that wil delete a post
router.route('/api/posts/:postId')
    .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove)

// Post route that updates likes array in the post document
router.route('/api/posts/like')
    .put(authCtrl.requireSignin, postCtrl.like)

// Post routes that updates the like array if user unlikes the post
router.route('/api/posts/unlike')
    .put(authCtrl.requireSignin, postCtrl.unlike)

// Post route that adds a comment to the post document
router.route('/api/posts/comment')
    .put(authCtrl.requireSignin, postCtrl.comment)

// Post route that removes a comment from the post document
router.route('api/posts/uncomment')
    .put(authCtrl.requireSignin, postCtrl.uncomment)

// userID parameter to specify the currently signed in user
router.param('userId', userCtrl.userByID)
// postByID parameter to fetch a speciifc post by its ID 
router.param('postId', postCtrl.postByID)

export default router