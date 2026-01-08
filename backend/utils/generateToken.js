import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const  generateAccesToken = function (user) {
  

      return   jwt.sign({_id:user._id , username:user.username,email:user.email  ,role:user.role} , process.env.ACCESS_TOKEN_SECRET ,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}


export const  generateRefreshToken = function (user) {
  

      return   jwt.sign({_id:user._id } , process.env.REFRESH_TOKEN_SECRET ,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}