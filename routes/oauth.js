const express = require("express")
const passport = require("passport")
const router = express.Router()

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/google/redirect",
  passport.authenticate("google"),
  function (req, res) {
    console.log(req) // this is not firing
  }
)
module.exports = router
