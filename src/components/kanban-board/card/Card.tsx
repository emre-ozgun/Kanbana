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
			<span className='card-title-span'>{card.title}</span>

			<div className='card-badges'>
				{card.description && (
					<div className='badge'>
						<div className='badge-icon'>
							<div className='badge-icon-text'>
								<MdSubject />
							</div>
						</div>
					</div>
				)}

				<div className='badge'>
					<span className='badge-icon'>
						<div className='badge-icon-text'>
							<MdOutlineAccessTime />
							{/* this shall be formated -> dd/mm */}
							<span>27 Mar</span>
						</div>
					</span>
				</div>

				{card.comments.length > 0 && (
					<div className='badge'>
						<span className='badge-icon'>
							<div className='badge-icon-text'>
								<MdOutlineModeComment />
								<span className='badge-text'>{card.comments.length}</span>
							</div>
						</span>
					</div>
				)}

				{/* checklist logic -> completed / total and if completed === total -. classList += badge-is-complete */}
				<div className='badge'>
					<span className='badge-icon badge-is-complete'>
						<div className='badge-icon-text'>
							<MdOutlineCheckBox />
							<span className='badge-text'>0/6</span>
						</div>
					</span>
				</div>
			</div>
		</div>
	);
};

export default React.memo(KanbanCard);
