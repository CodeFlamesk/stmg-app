const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController")
const {body} = require("express-validator")
const authMiddleware = require("../middleware/auth.middleware.js")


router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min:3, max:32}), 
    UserController.registration);
router.post("/login", 
    body("email").isEmail(),
    UserController.login);
    
router.post("/logout", UserController.logout);

router.delete("/del/:id", UserController.deleteUser);

router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users",authMiddleware,  UserController.getUsers);

router.post("/forgot", UserController.forgotPassword);
router.post("/password", 
    body("email").isEmail(),
    body("newPassword").isLength({min:3, max:32}),
    UserController.changePasswordForgot);
    
router.post("/password/change",  UserController.changePassword);

router.post("/avatar", UserController.addImage);
router.delete("/avatar/:id", UserController.deleteAvatar);


module.exports = router