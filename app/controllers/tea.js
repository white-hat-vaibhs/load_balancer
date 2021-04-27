//import tea model
const Tea = require('../models/tea');
const multer = require('multer');

//create storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

//initiate multer and pass storage
const uploadImg = multer({storage: storage}).single('image');


//GET all teas
const getAllTea = (req, res) => {
    Tea.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};


//POST tea
const newTea = (req, res) => {
    //check if the tea name already exists in db
    Tea.findOne({name:req.body.name},(data)=>{

        //if tea not in db, add it
        if(data===null){
            //create a new tea object using the Tea model and req.body
            const newTea = new Tea({
                name:req.body.name,
                image: req.file.path, // placeholder for now
                description: req.body.description,
                keywords: req.body.keywords,
                origin: req.body.origin,
                brew_time: req.body.brew_time,
                temperature: req.body.temperature,
            })

            // save this object to database
            newTea.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if tea is in db, return a message to inform it exists            
        }else{
            return res.json({message:"Tea already exists"});
        }
    })    
};


//DELETE teas
const deleteAllTea = (req, res) => {
    Tea.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

const getOneTea = (req, res) => {
    let name = req.params.name; //get the tea name

    //find the specific tea with that name
    Tea.findOne({name:name}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Tea doesn't exist."});
    }
    else return res.json(data); //return the tea object if found
    });
};

//POST 1 tea comment
const newComment = (req, res) => {
    let name = req.params.name; //get the tea to add the comment in
    let newComment = req.body.comment; //get the comment
    //create a comment object to push
    const comment = {
        text: newComment,
        date: new Date()
    }
    //find the tea object
    Tea.findOne({name:name}, (err, data) => {
        if(err || !data || !newComment) {
            return res.json({message: "Tea doesn't exist."});
        }
        else {
            //add comment to comments array of the tea object
            data.comments.push(comment);
            //save changes to db
            data.save(err => {
                if (err) { 
                return res.json({message: "Comment failed to add.", error:err});
                }
                return res.json(data);
            })  
        } 
    })
  };  

//DELETE 1 tea
const deleteOneTea = (req, res) => {
    let name = req.params.name; // get the name of tea to delete

    Tea.deleteOne({name:name}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Tea doesn't exist."});
    }
    else return res.json({message: "Tea deleted."}); //deleted if found
    });
};


//export controller functions
module.exports = {
    getAllTea, 
    newTea,
    uploadImg,  
    deleteAllTea,
    getOneTea,
    newComment,
    deleteOneTea
};