const express = require('express');
const multer = require('multer');
//file upload folder
const UPLOADS_FOLDER = "./uploads";

// prepare the final multer upload object
var upload = multer({
    dest: UPLOADS_FOLDER,
    limits: {
        fileSize: 1000000,
    },
    fileFilter:(req, file, cb ) => {
        if(file.fieldname === "avatar") {
            if(
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new Error("files must be in jpg, png or jpeg format"))
            }
        } else if( file.fieldname === "gallery") {
            if (file.mimetype === 'application/pdf') {
                cb(null, true)
            } else {
                cb(new Error(" your file is not pdf"))
            }
        } else {
            cb(new Error("There was an unknown error"));
        }
        
    },
});

const app = express();
//application route for multiple uploads fileds
/* app.post("/", upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "gallery", maxCount: 2}
]), (req, res) => {
    res.send("Hello world");
}); */

//application route for multiple files files
/* app.post("/", upload.array("avatar", 3), (req, res) => {
    res.send("Hello world");
}); */

//application route for single files
app.post("/", upload.single("avatar"), (req, res) => {
    res.send("Hello world");
});

//default error handler
app.use( (err, req, res , next) => {
    if(err) {
        res.status(500).send(err.message);
    } else {
        res.send("success");
    }
});

app.listen(3000, () => {
    console.log("app listening on port 3000")
})