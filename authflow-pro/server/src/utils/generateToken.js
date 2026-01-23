import jwt from "jsonwebtoken"

const generateToken = async (user) => {

  const payload = {
        userId: user._id,
        email: user.email,
        role: user.role
        
      }
      
      const newAccessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
  
      const newRefreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
  
      
  
      return {newAccessToken, newRefreshToken}
}

export default generateToken;