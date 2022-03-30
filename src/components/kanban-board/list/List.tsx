import React from 'react';
import { List, Card } from '../../../features/board/kanbanSlice';
import CardComposer from '../board/CardComposer';
import KanbanCard from '../card/Card';

type ListPropsType = {
	list: List;
};

const KanbanList = ({ list }: ListPropsType) => {
	const sortedCards = React.useMemo(() => {
		const sC = [...list.cards].sort((a: Card, b: Card) => a.order! - b.order!);
		return sC;
	}, [list.cards]);

	return (
		<div className='list-wrapper'>
			<div className='list-content'>
				{/* <ListHeader/> */}
				<div className='list-header'>{list.title}</div>
				{sortedCards && sortedCards.length > 0 && (
					<div className='card-container'>
						{sortedCards.map((card: Card) => {
							return <KanbanCard card={card} key={card.id} />;
						})}
					</div>
				)}
				<CardComposer listId={list.id} />
			</div>
		</div>
	);
};

export default React.memo(KanbanList);
