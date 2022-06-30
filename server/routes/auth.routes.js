import express from 'express'
import authCtrl from '../controllers/auth.controller'

// Route paths that require the user to signin and signout.
const router = express.Router()

router.route('/auth/signin')
  .post(authCtrl.signin)
router.route('/auth/signout')
  .get(authCtrl.signout)

export default router
