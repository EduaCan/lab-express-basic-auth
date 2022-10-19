const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.middlewares.js")

router.get("/", isLoggedIn ,(req, res, next)=>{
    res.render("profile/profile.hbs")
})



module.exports = router;