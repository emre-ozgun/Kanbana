const colors = [
	'#ff00ff',
	'#ff0000',
	'#800080',
	'#00ffff',
	'#cd5c5c',
	'#ff7f50',
	'#ff8c00',
	'#00bfff',
	'#4b0082',
	'#ff4500',
	'#da70d6',
	'#00ff7f',
	'#663399',
	'#40e0d0',
	'#b0e0e6',
	'#dda0dd',
	'#ffc0cb',
	'#cd853f',
	'#afeeee',
	'#db7093',
	'#191970',
	'#20b2aa',
	'#d3d3d3',
	'#e6e6fa',
	'#f0e68c',
	'#cd5c5c',
];
const alphabet = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

const generateBanner = (letter: string) => {
	const idx = alphabet.indexOf(letter.toUpperCase());

	if (idx > -1) {
		return colors[idx];
	} else {
		return '#222';
	}
};

const adjustContrast = (hexcolor: string) => {
	hexcolor = hexcolor.replace('#', '');
	var r = parseInt(hexcolor.substr(0, 2), 16);
	var g = parseInt(hexcolor.substr(2, 2), 16);
	var b = parseInt(hexcolor.substr(4, 2), 16);
	var yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? '#222' : '#fafafa';
};

const bannerUtil = {
	generateBanner,
	adjustContrast,
};

export default bannerUtil;
