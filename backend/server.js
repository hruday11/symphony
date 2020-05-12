const express = require('express');
const app = express();
const PORT = 4000;
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');


app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


const routes = express.Router();

async function convert(file, delimiter) {
    return new Promise((resolve, reject) => {
    var json = [];
    fs.readFile(file.tempFilePath,"utf8", function(err, data){
        var rows = data.split("\n");
        var keys = [];
        rows.forEach((value, index)=>{
            if(index < 1){// get the keys from the first row in the tab space file
                keys = value.split(delimiter);
            }else {// put the values from the following rows into object literals
                values = value.split(delimiter);
                json[index-1] = values.map((value, index) => {
                    return {
                        [keys[index]]: value
                    }
                }).reduce((currentValue, previousValue) => {
                    return {
                        ...currentValue,
                        ...previousValue
                    }
                });
            }
        })
        resolve(json)
    })
});
}

routes.route('/upload').post(async function(req, res){
    var resData = await convert(req.files.file, req.body.delimiter);
    res.send(resData)
});

app.use('/file', routes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});