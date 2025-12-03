import multer from "multer";
import path from "path";

//storage configuration
//this tells where to store files and what to name them
const storage = multer.diskStorage({

    //folder where files will be saved
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },

   //File name format : timestamp-originalname
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});


//File filter
//only allows images
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
console.log("@@@@@",file.mimetype);
    if(allowed.includes(file.mimetype)){
        console.log("file allowed");
        cb(null, true);
    }else{
        cb(new Error("only jpeg, jpg and png files are allowed"));
    }
}

//now finally create multer upload object
//"upload" bhanne use huncha route ko lagi
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});





