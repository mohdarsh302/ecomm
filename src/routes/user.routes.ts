import { Router } from "express";
import { UserController} from "../controllers/user.controller";
//import { UserAddressController } from "../controllers/userAddress.controller";
import authenticateToken from "../middlewares/authMiddleware";
const router = Router();

const userController  = new UserController();
// router.post("/login", (req, res, next) => {
//     console.log("Login route hit");
//     next();
//   }, userController.userLogin.bind(userController));

router.get("/", userController.getAllUsers.bind(userController));
router.post("/", userController.registerUser.bind(userController));
//router.get("/get/:id", userController.getUser.bind(userController));
router.get("/:id", userController.getUser.bind(userController));
router.post("/login", userController.userLogin.bind(userController));
router.get("/profile/user-profile", authenticateToken, userController.userProfile.bind(userController));




export default router;