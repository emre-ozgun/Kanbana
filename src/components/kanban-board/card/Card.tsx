import React from 'react';
import { Card } from '../../../features/board/kanbanSlice';
import {
	MdSubject,
	MdOutlineAccessTime,
	MdOutlineModeComment,
} from 'react-icons/md';
import Checklist from './Checklist';
import './Card.css';
import { formatDate } from '../../../utils/formatDate';
import { Link, useParams } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

type CardPropsType = {
	card: Card;
	id: number;
	index: number;
};

const KanbanCard = ({ card, id, index }: CardPropsType) => {
	const { boardId } = useParams();

	return (
		<Draggable draggableId={String(id)} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Link to={`/board/${boardId}/list/${card.listId}/card/${card.id}`}>
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

								{card?.duedate && (
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
												<span className='badge-text'>
													{card.comments.length}
												</span>
											</div>
										</span>
									</div>
								)}

								{card.checklists.length > 0 && (
									<Checklist checklists={card.checklists} />
								)}
							</div>
						</div>
					</Link>
				</div>
			)}
		</Draggable>
	);
};

export default React.memo(KanbanCard);
