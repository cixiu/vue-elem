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

// 解析食品分类的link
export function parseLink (link) {
	let ret = [];
	let data = '';
	let reg = /\[(\d+,\s)+\d+\]/g;
	let matches = link.match(reg);
	if (matches && matches.length > 1) {
		ret = matches[1].replace(/^\[|\]$/g, '').split(', ');
		for (var i = 0; i < ret.length; i++) {
			data += '&restaurant_category_ids[]=' + ret[i];
		};
	}
	return data;
}
