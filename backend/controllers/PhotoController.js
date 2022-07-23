
const Photo = require("../models/Photo")


const mongoose = require("mongoose")
const User = require("../models/User")


// isert a photo, with an user related to it

const insertPhoto = async(req,res) => {

    const {title} = req.body
   const image  = req.file.filename

   const requser = req.user 

   const user = await User.findById(requser._id);

   // create a phot
   const newPhoto = await Photo.create({
      image,
      title,
      userId: user._id,
      userName: user.name,
   })

   // if photo was created sucessfull, return data
   if(!newPhoto) {
      
    res.status(422).json({
        errors: ["Houve um problema, por favor tente novamente mais tarde"]
    })
    return
   }

   res.status(201).json(newPhoto)

}

//Remove a photo from db

const deletePhoto = async(req,res) => {

    const {id} = req.params

    const requser = req.user

    try {
            
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    //check if photo exists

    if(!photo) {
        res.status(404).json({errors: ["Foto não encontrada"]});
        return;
    }

    // check if photo belongs user

    if(!photo.userId.equals(requser._id)) {

        res.status(422).json({errors:["Ocorreu um erro, por favor tente novamente mais tarde"]})
           
    }

    await Photo.findByIdAndDelete(photo._id)

    res.status(200).json({id:photo._id, message: "Foto excluida com sucesso"})

} catch (error) {
    res.status(404).json({errors:"Foto não encontrada"})
    return
        
}



} 

// Get all photos

const getAllPhotos = async(req,res) => {
    
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()
    
    return  res.status(200).json(photos)

}
    
// Get user photos

const getUserPhotos = async(req,res) => {

    const {id} = req.params

    const photos = await Photo.find({userId:id}).sort([['createdAt', -1]]).exec()

    return res.status(200).json(photos)
}

// get photo by id 

const getPhotoByid = async(req,res) => {

    const {id} = req.params

    const photo =  await Photo.findById(mongoose.Types.ObjectId(id))
    
    // check if photo exists

    if(!photo) {
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }

    res.status(200).json(photo)
}

// update a photo

const updatePhoto = async(req,res) => {
    const {id} = req.params
    const {title} = req.body

    const requser = req.user

    const photo = await Photo.findById(id)
    console.log("reqUser",requser)
    console.log("FOTO", photo)
    
    //check if photo exists

    if(!photo) {
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }

    // check if photo belongs to user
    if(!photo.userId.equals(requser._id)) {
        res.status(422).json({errors:["Ocorreu um erro, por favor tente novamente Mais tarde i"]})
        return
    }

    if(title) {
        photo.title = title
    }

    await photo.save()

    res.status(200).json({photo, message: "Foto atualizada com sucesso"})
}

// função do like
const likPhoto = async (req,res) => {
    const {id} = req.params

const requser = req.user

const photo = await Photo.findById(id)
    //check if photo exists

    if(!photo) {
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }
  
    // check if user already liked the photo

    if(photo.likes.includes(requser._id)) {
        res.status(422).json({errors: ["Voce já curtiu a foto"]})
    }

    // put user id in likes array

    photo.likes.push(requser._id) 
        photo.save()

         res.status(200).json({photoId: id, userId:requser._id, message:"A foto foi curtida"})

}

//user comment

const comentPhoto = async(req,res) => {

    const {id} = req.params
    const {comment} = req.body

    const requser = req.user

    const user = await User.findById(requser._id)

    const photo = await Photo.findById(id)

        //check if photo exists

        if(!photo) {
            res.status(404).json({errors:["Foto não encontrada"]})
            return
        }

   // put comment in the array comments

   const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id
    
   }
   photo.comments.push(userComment)

  await  photo.save()

  res.status(200).json({
    comment: userComment,
    message: "O comentario foi adicionado com sucesso"
  })

}

// Search photos by title

const searchPhotos = async(req,res) => {

    const {q} = req.query

    const photos = await Photo.find({title: new RegExp(q,"i")}).exec()

    res.status(200).json(photos)


}
    


module.exports  = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoByid,
    updatePhoto,
    likPhoto,
    comentPhoto,
    searchPhotos

}

