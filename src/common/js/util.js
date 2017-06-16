// 解析图片地址
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

// 解析window.location
export function parseLocation (location) {
	let reg = /(id=\d+)/g;
	let matches = location.href.match(reg);
	if (matches) {
		return matches[0].substr(3);
	}
}
