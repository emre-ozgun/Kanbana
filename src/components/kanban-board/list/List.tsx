import { List, Card } from '../../../features/board/kanbanSlice';
import CardComposer from '../board/CardComposer';
import KanbanCard from '../card/Card';

type ListPropsType = {
	list: List;
};

const KanbanList = ({ list }: ListPropsType) => {
	return (
		<div className='list-wrapper'>
			<div className='list-content'>
				<div className='list-header'>{list.title}</div>
				{list.cards && list.cards.length > 0 && (
					<div className='card-container'>
						{list.cards.map((card: Card) => {
							return <KanbanCard card={card} key={card.id} />;
						})}
					</div>
				)}
				<CardComposer listId={list.id} />
			</div>
		</div>
	);
};

export default KanbanList;
