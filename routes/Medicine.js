const express = require("express")
const router = express.Router()
const { auth ,isCustomer,isAdmin } = require("../middlewares/auth")
const {
  createMedicine,
  medicineDelete,
  getAllMedicine,
  updateQuantityMedicine,
  findMedicine,
} = require("../controllers/Medicine")

// ********************************************************************************************************
//                                     Medicine Routes
// ********************************************************************************************************
// Delet User Account
router.post("/createMedicine", auth,isAdmin,createMedicine)
router.delete("/medicineDelete", auth,isAdmin, medicineDelete)
router.get("/getAllMedicine", auth, getAllMedicine)
// Get Enrolled Courses
router.put("/updateQuantityMedicine", auth,isAdmin, updateQuantityMedicine)
router.get("/findMedicine", auth, findMedicine)

module.exports = router