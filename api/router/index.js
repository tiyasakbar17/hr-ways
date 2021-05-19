const Auth = require("../controllers/Auth");
const Address = require("../controllers/getAddress");
const Cabang = require("../controllers/Cabang");
const { jwtAuth } = require("../middlewares/JwtRoleAuth");

const router = require("express").Router();

//** Auth **//
router.post("/login", Auth.login);
router.post("/add/user", jwtAuth(["admin"]), Auth.addUserCabang);
router.get("/load", jwtAuth(["cabang"]), Auth.loadData);

//** Get Address List */
router.get("/full/address", Address.addressList); //** get prov, kab, kec, kel, pos */

//** Cabang */
router.post("/cabang", jwtAuth(["cabang"]), Cabang.addCabang);

module.exports = router;
