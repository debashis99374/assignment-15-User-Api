const express = require('express')
const router=express.Router()
const {signup,
       login,
       changePassword,
       updateProfilePicture,
       updateContactDetails,
       findUserByPhoneNumber,
  //movie    
       createNewMovie,
       addRatingAndReview,
       getMovieReviewsWithUserDetails
      }=require('./functions')

router.post('/signup',signup)
router.post('/login',login)
router.post('/user/:userId/change-password',changePassword)
router.post('/user/:userId/change-profilePic',updateProfilePicture)
router.post('/update-contact/:email',updateContactDetails)
router.get('/users/phone/:phoneNumber',findUserByPhoneNumber)
//movie Routes
router.post('/movies',createNewMovie)
router.post('/movies/:movieId/rating',addRatingAndReview)
router.get('/movies/:movieId/reviews',getMovieReviewsWithUserDetails)


module.exports=router


