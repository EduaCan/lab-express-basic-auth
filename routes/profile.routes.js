const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.middlewares.js");
const User = require("../models/User.model.js");

//GET ("/profile") => renderiza la pagina personal del user
router.get("/", isLoggedIn , async (req, res, next)=>{
    const userDetails = await User.findById(req.session.activeUser._id)
    res.render("profile/profile.hbs", {
        userDetails
    })
})



//GET ("/profile/logout") => termina la sesion
router.get("/logout", (req, res, next) => {

    req.session.destroy(() => {
      res.redirect("/")
    })
  
  })



module.exports = router;