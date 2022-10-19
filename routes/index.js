const router = require("express").Router();
const { isLoggedIn } = require("../middlewares/auth.middlewares.js");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//GET ("/main") => ruta protegida con gatito
router.get("/main", isLoggedIn, (req, res, next)=>{
  res.render("main.hbs")
})

//GET ("/private") =>  ruta protegida con gif
router.get("/private", isLoggedIn, (req, res, next)=>{
  res.render("private.hbs")
})

//unificamos rutas
const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes);

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)


module.exports = router;
