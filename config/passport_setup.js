const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport = require("passport")
const User = require("../model/User")
const jwt = require("jsonwebtoken")
const res = require("express/lib/response")
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/oauth/google/redirect",
      scope: ["profile", "email"], //this is what was missed!!

      //   passReqToCallback: true,
    },
    async function (profile, done) {
      console.log(done)
      let user
      try {
        user = await User.findOne({ googleId: profile.id })
        if (user) {
          const payload = {
            user: {
              id: user.id,
            },
          }
          jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err
              res.status(200).json(token)
            }
          )
        } else {
          user = new User({
            googleId: profile.id,
            userName: profile.displayName,
            email: profile.email,
            profileType: "empalyee",
            photo: profile.photos[0].value,
          })
          const payload = {
            user: {
              id: user.id,
            },
          }
          jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) throw err

              //   res.status(200).json(token)
            }
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
  )
)
