import React from 'react';
import { List, Card } from '../../../features/board/kanbanSlice';
import CardComposer from '../board/CardComposer';
import KanbanCard from '../card/Card';
import { Droppable } from 'react-beautiful-dnd';
import ListHeader from './ListHeader';
import './List.css';

type ListPropsType = {
	list: List;
};

const KanbanList = ({ list }: ListPropsType) => {
	const sortedCards = React.useMemo(() => {
		const sC = [...list.cards].sort((a: Card, b: Card) => a.order! - b.order!);
		return sC;
	}, [list.cards]);

	return (
		<Droppable droppableId={String(list.id)}>
			{(provided) => (
				<div
					className='list-wrapper'
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					<div className='list-content'>
						{/* <ListHeader/> */}
						<ListHeader title={list.title} listId={list.id} />

						{sortedCards && sortedCards.length > 0 && (
							<div className='card-container'>
								{sortedCards.map((card: Card, index) => {
									return (
										<KanbanCard
											card={card}
											key={card.id}
											id={card.id}
											index={index}
										/>
									);
								})}
							</div>
						)}
						{provided.placeholder}
						<CardComposer listId={list.id} />
					</div>
				</div>
			)}
		</Droppable>
	);
};

export default React.memo(KanbanList);
