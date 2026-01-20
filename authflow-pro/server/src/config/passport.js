import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";



passport.use(
  
  new GoogleStrategy(
    {
      
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      /*
        This function runs AFTER Google successfully logs in the user.
        For now, we are NOT saving anything in DB.
        We are only learning the flow.
      */

      console.log("Google profile:", profile);

      // Temporary: just pass Google profile forward
      return done(null, profile);
    }
  )
);
