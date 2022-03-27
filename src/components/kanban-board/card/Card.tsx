import { Card } from '../../../features/board/kanbanSlice';

type CardPropsType = {
	card: Card;
};

const KanbanCard = ({ card }: CardPropsType) => {
	return <div className='card'>{card.title}</div>;
};

export default KanbanCard;
