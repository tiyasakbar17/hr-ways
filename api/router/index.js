const Auth = require("../controllers/Auth");
const Address = require("../controllers/getAddress");
const Cabang = require("../controllers/Cabang");
const { jwtAuth } = require("../middlewares/JwtRoleAuth");
const Karyawan = require("../controllers/Karyawan");

const router = require("express").Router();

//** Auth **//
router.get("/load", jwtAuth(["cabang"]), Auth.loadData);
router.post("/login", Auth.login);

//** User */
router.get("/user/all", jwtAuth(["admin"]), Auth.getUserCabang);
router.post("/user/add", jwtAuth(["admin"]), Auth.addUserCabang);
router.patch("/user/restore", jwtAuth(["admin"]), Auth.restoreUserCabang);
router.delete("/user/delete", jwtAuth(["admin"]), Auth.deleteUserCabang);

//** Get Address List */
router.get("/full/address", Address.addressList); //** get prov, kab, kec, kel, pos */

//** Cabang */
router.get("/cabang/all", jwtAuth(["admin"]), Cabang.getAllCabang);
router.post("/cabang/add", jwtAuth(["admin"]), Cabang.addCabang);
router.patch("/cabang/edit", jwtAuth(["admin"]), Cabang.editCabang);
router.patch("/cabang/restore", jwtAuth(["admin"]), Cabang.restoreCabang);
router.delete("/cabang/delete", jwtAuth(["admin"]), Cabang.deleteCabang);

//** Karyawan */
router.get("/karyawan", Karyawan.getKaryawanByKtp);
router.get("/karyawan/all", jwtAuth(["cabang"]), Karyawan.getKaryawan);
router.post("/karyawan/add", jwtAuth(["cabang"]), Karyawan.addKaryawan);
router.patch("/karyawan/edit", jwtAuth(["cabang"]), Karyawan.updateKaryawan);
router.patch("/karyawan/restore", jwtAuth(["cabang"]), Karyawan.restoreKaryawan);
router.delete("/karyawan/delete", jwtAuth(["cabang"]), Karyawan.deleteKaryawan);

module.exports = router;
