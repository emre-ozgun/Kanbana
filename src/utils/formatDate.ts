export const formatDate = (dateStr: string) => {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	const dateFields = dateStr.split('-');

	const day = dateFields[2];
	const month = months[Number(dateFields[1]) - 1];

	return `${day} ${month}`;
};
