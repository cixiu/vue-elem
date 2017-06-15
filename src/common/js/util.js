
export function parseImage (imgurl) {
	const img = insertStringImgUrl(imgurl);
	return `//fuss10.elemecdn.com/${img}?imageMogr/format/webp/thumbnail/!120x120r/gravity/Center/crop/120x120/`;
};

function insertStringImgUrl (imgurl) {
	imgurl = imgurl.split('');
	imgurl.splice(1, 0, '/');
	imgurl.splice(4, 0, '/');
	let newImgurl = imgurl.join('');
	let reg = /(png)/g;
	if (reg.test(newImgurl)) {
		return newImgurl + '.png';
	} else {
		return newImgurl + '.jpeg';
	}
}
