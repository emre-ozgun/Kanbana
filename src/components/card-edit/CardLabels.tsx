import React from 'react';

type CardLabelsPropsType = {
	labels: any[];
};

const CardLabels = ({ labels }: CardLabelsPropsType) => {
	return (
		<article className='single-card-misc-item'>
			<h3 className='single-card-misc-item__title'>Labels</h3>
			<div className='single-card-misc-item__items'>
				{labels.map((label: any) => {
					return (
						<div
							key={label.id}
							className='single-card-label'
							style={{ backgroundColor: `${label.color}` }}
						>
							{label.title.endsWith('i') ? 'Urgent' : 'Idle'}
						</div>
					);
				})}
			</div>
		</article>
	);
};

export default CardLabels;
