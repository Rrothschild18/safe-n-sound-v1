const Albuns = require('../../models/api/Album');
const album = new Albuns();


exports.showData = (req, res) => {
	res.json(album.showData());
}
exports.showValue = (req, res) => {
	res.json(album.showValue(req.params));
}
exports.getAlbum = async (req, res) => {
	const ID = req.params.id;

	if(!album.validUserInput(ID)) {
		res.json({error: 'Bad Request'});
	}
	try {
		const TOKEN = await album.tokenRequest();
		const data = await album.getAlbum(TOKEN, ID);
		res.json(data);
	} catch(e) {
		// res.json(e.message, e.name);
	}

}