const Artists = require('../../models/api/Artist');
const artist = new Artists();

exports.showData = (req, res) =>{
    res.json(artist.showData());
}

exports.showValue = (req,res)=>{
    res.json(artist.showValue(req.params));
}

exports.getArtist = async (req,res)=>{
    const ID = req.params.id;

    if(!artist.validUserInput(ID)){
        res.json({erro:'Bad Request'});
    }

    try{
        const TOKEN = await artist.tokenRequest();
        const data = await artist.getArtist(TOKEN, ID);
        res.json(data);
    }catch(e){
        res.json(e);
    }
}

exports.getArtistTop = async(req, res)=>{
    const ID = req.params.id;
    if(!artist.validUserInput(ID)){
        res.json({erro:'Bad Request'});
    }

    try{
        const TOKEN = await artist.tokenRequest();
        const data = await artist.getArtistTop(TOKEN, ID);
        res.json(data);
    }catch(err){
        res.json(err);
    }

}

