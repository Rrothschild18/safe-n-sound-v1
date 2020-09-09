const querystring = require("querystring");
const axios = require("axios").default;
const at = require('../token.js');
const {throws}  = require("assert");

const Artist = function(){
    this.data;
    this.error;
}

Artist.prototype.validUserInput = function(param){
    if(param.length == 0) {
        error.msg = "Campo vazio";
        return false;
    }else {
		return true;
	}
}

Artist.prototype.showData = function(){
    const data = {
        thats: 'teste',
        a: 'funciona',
        test: 'isso ai'
    }
    return data;
}

Artist.prototype.getArtist = async function(TOKEN, ID){
    const ARTIST_ID = ID;
    const ACESS_TOKEN = TOKEN;

    const config_art ={
        method:"get",
        url: "https://api.spotify.com/v1/artists/" + ARTIST_ID,
        headers:{
            Authorization: "Bearer " + ACESS_TOKEN,
        },
    };

    try{
        var response = await axios.request(config_art);
        data = response.data;

        return data;
    }catch(e){
        delete e.config
        delete e.stack;
        return e;
    }
}

Artist.prototype.tokenRequest = async function(param){
    var x = at();
    const config ={
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        headers:{
            Authorization:
                "Basic " + new Buffer.from(x.client_id + ":" + x.client_secret).toString("base64"),
        },
        data: querystring.stringify({grant_type:"client_credentials"}),
    };

    try{
        var response = await axios.request(config);
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports = Artist;