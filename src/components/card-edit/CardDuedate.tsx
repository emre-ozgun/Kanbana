import React from 'react';

type CardDuedatePropsType = {
	duedate: string | null;
};

const CardDuedate = ({ duedate }: CardDuedatePropsType) => {
	return (
		<article className='single-card-misc-item'>
			<h3 className='single-card-misc-item__title'>Duedate</h3>
			<div className='single-card-misc-item__items'>
				<div
					className='single-card-label single-card-label-date'
					style={{ color: '#172b4d', backgroundColor: `#091e420a` }}
				>
					25 Mar 2022
				</div>
			</div>
		</article>
	);
};

export default CardDuedate;
