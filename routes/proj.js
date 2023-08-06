const express = require('express');
const router = express.Router();
const archive_url = 'http://localhost:8080/archive';

const ReadArchive = async (url) => {
    const response = await fetch(url);
    const status = response.status;
    const data = await response.json();
    return data ;
};

router.get('/get_user_info',   async (req, res, next) => {
    const data = await ReadArchive(archive_url);
    if (data != null){
        //Json parsing
        return res.status(200).json( data );
    }
    else
    {
        return res.status(401).json( {"message":"Error!"} );
    }
});

router.get('/get_first_names',   async (req, res, next) => {
    const names = [];
    const data = await ReadArchive(archive_url);
    if (data != null){
        console.log(data.text);
        for (i=0 ; i < 2; i++){
            names.push(data.text);
        }
        return res.status(200).json(data[0].text);
    }
    else
    {
        return res.status(401).json( {"message":"Error!"} );
    }
});

module.exports = router;