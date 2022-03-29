import moment from 'moment';

export const formatTime = (zDate: string) => {
	const fields = zDate.split('-');

	const year = fields[0];
	const month = Number(fields[1]) - 1;
	const day = fields[2].slice(0, 2);

	const formattedDate = moment([year, month, day]).fromNow();

	return formattedDate;
};
