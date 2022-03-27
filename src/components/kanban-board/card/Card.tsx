import React from 'react';
import { Card } from '../../../features/board/kanbanSlice';
import {
	MdSubject,
	MdOutlineAccessTime,
	MdOutlineModeComment,
	MdOutlineCheckBox,
} from 'react-icons/md';
import './Card.css';

type CardPropsType = {
	card: Card;
};

const KanbanCard = ({ card }: CardPropsType) => {
	return (
		<div className='card'>
			<div className='card-labels'>
				{card.labels &&
					card.labels.length > 0 &&
					card.labels.map((label: any) => {
						return (
							<span
								className='card-label'
								key={label.id}
								style={{ backgroundColor: `${label.color}` }}
							></span>
						);
					})}
			</div>
			{card.title}
			<div className='card-badges'>
				{/* description */}
				{/* duedate */}
				{/* comment */}
				{/* checklist */}
			</div>
		</div>
	);
};

export default React.memo(KanbanCard);
