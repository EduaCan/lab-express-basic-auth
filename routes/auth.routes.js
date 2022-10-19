const router = require("express").Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

//GET "/auth/signup" => renderizar el form para registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

//POST "/auth/signup" => validar y pasar la info del form a la BD
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  //1. Validaciones
  //campos vacios
  if (username === "" || password === "") {
    res.render("auth/signup.hbs", {
      errorMessage: "Rellena todos los campos!",
    });
    return;
  }
  //user unico
  try {
    const user = await User.findOne({ username: username });
    if (user !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "Este usuario ya existe",
      });
      return;
    }
    //2. elemento de seguridad
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    //3. crear el user en la BD
    const newUser = {
      username: username,
      password: hashPassword,
    };
    await User.create(newUser);
    //una vez creado lo mando al login
    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});

//GET "/auth/login" => renderiza el form para login
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

//POST "/auth/login" => validar y crear cookie de acceso
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  //campos vacios
  if (username === "" || password === "") {
    res.render("auth/login.hbs", {
      errorMessage: "Rellena todos los campos!",
    });
    return;
  }
  try {
    //user exists
    const userExists = await User.findOne({ username: username });
    if (userExists === null) {
      res.render("auth/login.hbs", {
        errorMessage: "User no existe.",
      });
      return;
    }
    //correct password
    const isPasswordCorrect = await bcrypt.compare(password, userExists.password)
    if(isPasswordCorrect=== false) {
        res.render("auth/login.hbs", {
            errorMessage: "Credenciales incorrectas.",
          });
          return;
    }
    req.session.activeUser = userExists
    req.session.save(()=>{
        //redireccionar a una pagina privada
        res.redirect("/profile");
    })
  } catch (error) {}
});



module.exports = router;
