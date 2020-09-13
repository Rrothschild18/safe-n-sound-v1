const Submit = function (form, type) {
    this.form = this.getElement(form);
    this.type = type;
    this.ID = "";
    this.OLD_ID = "";
}

Submit.prototype.init = function (){
    this.form.addEventListener("submit", (e) => {
		e.preventDefault();
		this.ID = this.form.querySelector("#album").value;
		ID = ID.replace(/\W/gi, '')
		
		console.log(ID)
		// if(this.verifyData(iD, OLD_ID)) 
            // all_request(ALBUM_ID, OLD_ALBUM_ID)

		OLD_ID = ID;
	});
}

Submit.prototype.getElement = function(form){
    return document.querySelector(form)
}

Submit.prototype.searchType = function(){
    if(this.type == 'artists')
        // const searchArtists = new Search('artists');
    if(this.type == 'album')
        // const searchAlbum = new Search();
    return false;
}

Submit.prototype.showError = function (msg){
    const DIV = document.querySelector(".input")
    let message = document.querySelector("#msg");

    DIV.style.borderColor = 'red';
    message.style.color = 'red';
    message.innerText = ''+ msg + '';
}

Submit.prototype.showSucces = function() {
    const DIV = document.querySelector(".input")
    let message = document.querySelector("#msg");
    let msg = 'Success xD'

    DIV.style.borderColor = 'green';
    message.style.color = 'green';
    message.innerText = msg;
}

Submit.prototype.verifyData = function (ID, OLD_ID){
    if(ID.length == 0)
        return false;
    if(ID == OLD_ID)
        return false;

    return true;
}

module.exports = Submit;