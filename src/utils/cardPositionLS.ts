export const getCardPositionFromLS = () => {
	return localStorage.getItem('card');
};

export const setCardPositionLS = (pos: number) => {
	localStorage.setItem('card', JSON.stringify(pos));
};

const cardLS = {
	getCardPositionFromLS,
	setCardPositionLS,
};

export default cardLS;
