const express = require("express")
const router = express.Router()


// controllers
const {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoByid, updatePhoto,likPhoto,comentPhoto, searchPhotos} = require("../controllers/PhotoController")

//middlewares
const {photoInsertValidation, photoUpdateValidation, commentValidation} = require("../middlewares/PhotoValidation")
const  authGuard = require('../middlewares/authGuard')
const validate = require("../middlewares/handleValidation")
const { imageUpload } = require("../middlewares/imageUpload")



//routes
router.post("/",authGuard,imageUpload.single("image"),

photoInsertValidation(),validate, insertPhoto)

router.delete("/:id", authGuard, deletePhoto)

router.get("/",authGuard,getAllPhotos)
router.get("/user/:id", authGuard,getUserPhotos)
router.get("/search",authGuard,searchPhotos)
router.get("/:id",authGuard,getPhotoByid)
router.put("/:id",authGuard,photoUpdateValidation(),validate,updatePhoto)
router.put("/like/:id",authGuard,likPhoto)
router.put("/comment/:id",authGuard,commentValidation(),validate,comentPhoto)



module.exports = router