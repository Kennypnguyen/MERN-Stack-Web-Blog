import Post from '../models/post.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

// Create post that will be able to access fields and image file
const create = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded"
        })
      }
      let post = new Post(fields)
      post.postedBy= req.profile
      if(files.photo){
        post.photo.data = fs.readFileSync(files.photo.path)
        post.photo.contentType = files.photo.type
      }
      try {
        let result = await post.save()
        res.json(result)
      }catch (err){
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
    })
  }
  // Attach the post retrieved from the database to the request object so that it can be accessed by the next method
  const postByID = async (req, res, next, id) => {
    try{
      let post = await Post.findById(id).populate('postedBy', '_id name').exec()
      if (!post)
        return res.status('400').json({
          error: "Post not found"
        })
      req.post = post
      next()
    }catch(err){
      return res.status('400').json({
        error: "Could not retrieve use post"
      })
    }
  }
  // List the posts that has a matching reference in the postedBy field to the user specified in the userId param in the route
  const listByUser = async (req, res) => {
    try{
      let posts = await Post.find({postedBy: req.profile._id})
                            .populate('comments.postedBy', '_id name')
                            .populate('postedBy', '_id name')
                            .sort('-created')
                            .exec()
      res.json(posts)
    }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }
  // Query the post collectio in the database to get matching posts
  const listNewsFeed = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try{
      let posts = await Post.find({postedBy: { $in : req.profile.following } })
                            .populate('comments.postedBy', '_id name')
                            .populate('postedBy', '_id name')
                            .sort('-created')
                            .exec()
      res.json(posts)
    }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }
  // User will be able to remove their own post
  const remove = async (req, res) => {
    let post = req.post
    try{
      let deletedPost = await post.remove()
      res.json(deletedPost)
    }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }
  // Retrieve the post's photo stored in MongoDB
  const photo = (req, res, next) => {
      res.set("Content-Type", req.post.photo.contentType)
      return res.send(req.post.photo.data)
  }
  // Update the likes array in the post document by pushing the current user's ID to the likes array
  const like = async (req, res) => {
    try{
      let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.body.userId}}, {new: true})
      res.json(result)
    }catch(err){
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
    }
  }
  // Update the likes array in the post documents if user unlikes by pulling the current user's ID from the likes array
  const unlike = async (req, res) => {
    try{
      let result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.body.userId}}, {new: true})
      res.json(result)
    }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }
  // Update the comments array in the post document by pushing the the comments object that has been recieved in the request body to the comments array
  const comment = async (req, res) => {
    let comment = req.body.comment
    comment.postedBy = req.body.userId
    try{
      let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}}, {new: true})
                              .populate('comments.postedBy', '_id name')
                              .populate('postedBy', '_id name')
                              .exec()
      res.json(result)
    }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }
  // Update the comments array in the post document if user uncomments by pulling the the comment object with the deleted comment's id from the comments array
  const uncomment = async (req, res) => {
    let comment = req.body.comment
    try{
      let result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {comments: {_id: comment._id}}}, {new: true})
                            .populate('comments.postedBy', '_id name')
                            .populate('postedBy', '_id name')
                            .exec()
      res.json(result)
    }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }
  // Checks to see if the user is authorized (That it is the user's own post)
  const isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    if(!isPoster){
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
  }
  
  export default {
    listByUser,
    listNewsFeed,
    create,
    postByID,
    remove,
    photo,
    like,
    unlike,
    comment,
    uncomment,
    isPoster
  }