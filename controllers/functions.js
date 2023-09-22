const User=require('../model/userModel')
const Movie=require('../model/movieModel')

const signup=async(req,res)=>{
  //ok
  try{
    const {email,password,username,profilePicture,phoneNumber,address}=req.body;

    const user=new User({email,password,username,profilePicture,phoneNumber,address})
    await user.save()
    
    res.status(201).json({ message: 'User created successfully', user });
    
    
    
  }catch(err){
    
    res.status(500).json({ error: 'Internal server error:signup',err });
  }
}
const login=async(req,res)=>{
  //ok
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(!user){
      res.status(404).json({ message: 'no user found'});
    }
    if(user.password!==password&&user.email!==email){
      res.status(404).json({ message: 'invalid details for login'});
    }
    console.log(user)
    res.status(200).json({ message: 'Log in succesful', user });
  }catch(err){

    res.status(500).json({ error: 'Internal server error:login',err });
  }
}
const changePassword=async(req,res)=>{
  //ok
  try{
    const userId=req.params.userId
    const {email,currentPassword,newPassword}=req.body
    const user=await User.findById(userId)
    if(!user){
      res.status(404).json({ message: 'no user found'});
    }
    if (user.email !== email) {
      return res.status(400).json({ message: 'Email does not match ' });
    }
    if(user.password===currentPassword){
      user.password=newPassword
      await user.save()
      res.status(200).json({ message: 'Password changed succesfully', user });
    }
    res.status(404).json({ message: 'current password incorrect'});
    
    
  }catch(err){
    res.status(500).json({ error: 'Internal server error:password change',err });
  }
}
const updateProfilePicture=async(req,res)=>{
  //ok
  try{
    const userId=req.params.userId
    const {email,newProfilePicture}=req.body
    const user=await User.findById(userId)
    if(!user){
      res.status(404).json({ message: 'no user found'});
    }
    if(user.email!==email){
      res.status(404).json({ message: 'Sorry cant update bescuse you put wrong email'});
    }
    user.profilePicture=newProfilePicture;
    await user.save()
    res.status(200).json({ message: 'Profile picture updated',user});
    
    
    
  }catch(err){
    res.status(500).json({ error: 'Internal server error:update profile pic',err });
  }
}
const updateContactDetails=async(req,res)=>{
  //ok
  try{
    const {email}=req.params
    
    const {newPhoneNumber,newAddress}=req.body
    const user=await User.findOne({email})
    if(!user){
      res.status(404).json({message:"enter correct email"})
    }
    user.phoneNumber=newPhoneNumber
    user.address=newAddress
    await user.save()
    res.status(200).json({message:"Contact details updated",user})
    
    
    
  }catch(err){
    res.status(500).json({ error: 'Internal server error:update conatct details',err });
  }
}
const findUserByPhoneNumber=async(req,res)=>{
  //ok
  try{
    const {phoneNumber}=req.params
    const user=await User.findOne({phoneNumber})
    
    if(!user){
      res.status(404).json({message:"enter correct number"})
    }
    res.status(200).json({message:"here is the user",user})
    
  }catch(err){
    res.status(500).json({ error: 'Internal server error:find by phone number',err });
  }
}

//movie functions

const createNewMovie=async(req,res)=>{
  try{
    const movieData=req.body
    const movie=new Movie(movieData)
    await movie.save()
    if(!movie){
      res.json({message:"cant add movie"})
    }
    res.status(200).json({message:"movie added succesfully",movie})
    
  }catch(err){
    res.status(500).json({message:"server error:post movie"})
    
  }
}
const addRatingAndReview=async(req,res)=>{
  //ok
  try{
    const movieId=req.params.movieId
    const reviewData=req.body
    const movie=await Movie.findById(movieId)
    if(!movie){
       res.json({message:"cant find movie maybe movie id is wrong"})
    }
  movie.reviews.push(reviewData)
    await movie.save()
    res.status(200).json({message:"review added succesfully",movie})
    
    
  }catch(err){
    res.status(500).json({message:"server error:post review"})
  }
}
const getMovieReviewsWithUserDetails=async(req,res)=>{
  try{
    const movieId=req.params.movieId
    const movie=await Movie.findById(movieId)
    const top3Reviews=movie.reviews.splice(0,3)
    const populatedReviews = await Promise.all(
      top3Reviews.map(async (review) => {
        const user = await User.findById(review.user);
        return {
          user: {
            username: user.username,
            profilePicture: user.profilePicture,
          },
          text: review.text,
          rating: review.rating,
        };
      })
    );

    res.status(200).json({ reviews: populatedReviews });
    
  }catch(err){
    console.log(err)
    res.status(500).json({message:"server error:get reviews along with user"})
  }
}






module.exports={
  signup,
  login,
  changePassword,
  updateProfilePicture,
  updateContactDetails,
  findUserByPhoneNumber,
  createNewMovie,
  addRatingAndReview,
  getMovieReviewsWithUserDetails
}