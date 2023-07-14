import router from "core/routes";
import login from "../controllers/user-login.controller";

router.get("/User/Login", login);
