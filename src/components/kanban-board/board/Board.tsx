import ListComposer from './ListComposer';
import CardComposer from './CardComposer';
import { Card, List } from '../../../features/board/kanbanSlice';

import './Board.css';

// export type Card = {
// 	id: number;
// 	title: string;
// 	despcription: string | null;
// 	order: number | null;
// 	listId: number;
// 	labels: any[];
// 	checklists: any[];
// 	comments: any[];
// };

// export type List = {
// 	id: number;
// 	order: number | null;
// 	title: string;
// 	boardId: number;
// 	cards: Card[];
// };

type ListType = {
	lists: List[];
};

const Board = ({ lists }: ListType) => {
	console.log(lists);

	return (
		<main className='board'>
			{lists &&
				lists.length > 0 &&
				lists.map((list: List) => {
					return (
						<div className='list-wrapper' key={list.id}>
							<div className='list-content'>
								<div className='list-header'>{list.title}</div>
								{list.cards && list.cards.length > 0 && (
									<div className='card-container'>
										{list.cards.map((card: Card) => {
											return (
												<div key={card.id} className='card'>
													{card.title}
												</div>
											);
										})}
									</div>
								)}
								<CardComposer listId={list.id} />
							</div>
						</div>
					);
				})}

			<div className='list-wrapper'>
				<ListComposer />
			</div>
		</main>
	);
};

export default Board;
