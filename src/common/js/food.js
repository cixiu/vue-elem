export class Food {
	constructor ({shopid, category_id, item_id, food_id, name, price, count, packing_fee, stock, spec, attr, specfoods}) {
		this.shopid = shopid;
		this.category_id = category_id;
		this.item_id = item_id;
		this.food_id = food_id;
		this.name = name;
		this.price = price;
		this.count = count;
		this.packing_fee = packing_fee;
		this.stock = stock;
		this.spec = spec;
		this.attr = attr;
		this.specfoods = specfoods;
	}
};

export function createFood (foodData) {
	if (foodData.activity && foodData.activity.is_price_changed) {
		foodData.price = foodData.specfoods[0].original_price;
	} else {
		foodData.price = foodData.specfoods[0].price;
	}
	let spec = '';
	let attr = [];
	// 如果选中的是规格商品
	if (foodData.specIndex >= 0) {
		spec = foodData.specifications[0].values[foodData.specIndex];
		foodData.price = foodData.specfoods[foodData.specIndex].price;
	} else {
		spec = '';
	}
	if (foodData.specAttrIndex && foodData.attrs.length) {
		// attr = foodData.attrs[0].values[foodData.specAttrIndex];
		// console.log(foodData.specAttrIndex);
		foodData.attrs.forEach((item, attrIndex) => {
			// attr += `${item.values[foodData.specAttrIndex]}/`;
			attr.push(item.values[foodData.specAttrIndex[attrIndex].index]);
		});
	} else {
		attr = [];
	}
	return new Food({
		shopid: foodData.shopid,
		category_id: foodData.category_id,
		item_id: foodData.item_id,
		food_id: foodData.specfoods[0].food_id,
		name: foodData.name,
		price: foodData.price,
		count: foodData.count,
		packing_fee: foodData.specfoods[0].packing_fee,
		stock: foodData.specfoods[0].stock,
		spec,
		attr,
		specfoods: foodData.specfoods
	});
}
