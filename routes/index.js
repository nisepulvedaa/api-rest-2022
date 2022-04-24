const express = require('express');
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;//path del archivo

const removeExtension = (filename) => {
    return filename.split('.').shift()
}

const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file); //Puede que lleve index, tracks finalmente llegara (users, storages, tracks)
    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`)); //esto sera http://localhost/api/
    }
});

module.exports = router;
