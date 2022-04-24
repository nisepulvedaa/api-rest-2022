const customHeader = (req, res, next) => {
    //console.log(req.body);
    try{
        const apiKey = req.headers.api_key;
        if(apiKey === "nico12345687-"){
            next();
        }else if (apiKey === undefined){
            res.status(403);
            res.send({error: "debe agregar a su Peticion una API_KEY"});
        }else{
            res.status(403);
            res.send({error: " Su API_KEY No es Correcta"});
        }
    }catch(e){
        res.status(403);
        res.send({error: "Algo Ocurrio el Custom Header"});
    }
}

module.exports = customHeader;