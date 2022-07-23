
const express = require("express")

const router =  express.Router()

//controller

const {register, login, getCurrentUser, update, getUserByid} = require("../controllers/UserController")

// middlewares
const validate = require("../middlewares/handleValidation")
const {userCreateValidation, loginValidaTion, useUpdateValidation} = require('../middlewares/useValidation')
const authGuard = require("../middlewares/authGuard")
const { imageUpload } = require("../middlewares/imageUpload")
const { route } = require("./Router")

//routes

router.post("/register",userCreateValidation(),validate,register);
router.post("/login",loginValidaTion(),validate,login);
router.get("/profile", authGuard,getCurrentUser)
router.put("/", authGuard,useUpdateValidation(), validate, imageUpload.single("proflleImage"), update)
router.get("/:id", getUserByid)


module.exports = router