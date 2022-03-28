import React from 'react';
import { MdOutlineModeComment } from 'react-icons/md';

type CardDescriptionPropsType = {
	comments: any[];
	listId: string | undefined;
};

const CardComment = ({ comments, listId }: CardDescriptionPropsType) => {
	return (
		<>
			<section className='single-card__title'>
				<div className='single-card__title-icon'>
					<MdOutlineModeComment />
				</div>

				<div className='single-card__title-text'>
					<h4>Comments</h4>
				</div>
			</section>
		</>
	);
};

export default CardComment;
