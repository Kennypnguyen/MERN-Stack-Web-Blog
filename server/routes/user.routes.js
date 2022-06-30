import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

// routes paths that corresponds to the user controller functions that will be called when the requests are received by the server
const router = express.Router()

// Route paths to create a user and list users. Does not require the need to sign in
router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

// Route paths that reads, updates, and delete a user. These require the user to be signed in. While the the user needs to also have permission to update and delete
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

// Route paths to retrieve photos from user or database
router.route('/api/users/photo/:userId')
  .get(userCtrl.photo, userCtrl.defaultPhoto)
router.route('/api/users/defaultphoto')
  .get(userCtrl.defaultPhoto)

// Route paths for the user follow
router.route('/api/users/follow')
  .put(authCtrl.requireSignin,
       userCtrl.addFollowing,
       userCtrl.addFollower)

// Route paths for the user unfollow
 router.route('/api/users/unfollow')
  .put(authCtrl.requireSignin,
       userCtrl.removeFollowing,
       userCtrl.removeFollower)

// Route paths to fetch the list of users the current user is not following
router.route('/api/users/findpeople/:userId')
  .get(authCtrl.requireSignin, userCtrl.findPeople)

// Parameter that fetches and loads the user 
router.param('userId', userCtrl.userByID)

export default router