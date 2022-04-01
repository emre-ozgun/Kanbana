export const formatDate = (dateStr: string | null | undefined) => {
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

	if (typeof dateStr === 'string') {
		const dateFields = dateStr.split('-');
		const day = dateFields[2];
		const month = months[Number(dateFields[1]) - 1];
		return `${day} ${month}`;
	}
};
