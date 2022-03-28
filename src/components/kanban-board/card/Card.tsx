import React from 'react';
import { Card } from '../../../features/board/kanbanSlice';
import {
	MdSubject,
	MdOutlineAccessTime,
	MdOutlineModeComment,
	MdOutlineCheckBox,
} from 'react-icons/md';
import Checklist from './Checklist';
import './Card.css';
import { formatDate } from '../../../utils/formatDate';
import { Link, useParams } from 'react-router-dom';

type CardPropsType = {
	card: Card;
};

const KanbanCard = ({ card }: CardPropsType) => {
	const { boardId } = useParams();

	console.log(card.checklists);

	return (
		<div className='card'>
			<Link to={`/board/${boardId}/card/${card.id}`}>
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

					{card.duedate && (
						<div className='badge'>
							<span className='badge-icon'>
								<div className='badge-icon-text'>
									<MdOutlineAccessTime />
									{/* this shall be formated -> dd/mm */}
									<span>{formatDate(card.duedate)}</span>
								</div>
							</span>
						</div>
					)}

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

					{card.checklists.length > 0 && (
						<Checklist checklists={card.checklists} />
					)}
				</div>
			</Link>
		</div>
	);
};

export default React.memo(KanbanCard);
