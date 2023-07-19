import router from "core/routes";
import allUsers from "../controllers/user-all.controller";
import { details } from "../controllers/user-details.constroller";
import login from "../controllers/user-login.controller";
import signup from "../controllers/user-signup.controller";
import update from "../controllers/user-update.controller";

router.post("/User/Login", login);
router.post("/User/Signup", signup);
router.get("/User/All", allUsers);
router.patch("/User/Update", update);
router.get("/User/Details", details);
