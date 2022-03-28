import React from 'react';
import ListComposer from './ListComposer';
import { List } from '../../../features/board/kanbanSlice';
import KanbanList from '../list/List';

import './Board.css';

type ListType = {
	lists: List[];
};

const Board = ({ lists }: ListType) => {
	return (
		<main className='board'>
			{lists &&
				lists.length > 0 &&
				lists.map((list: List) => {
					return <KanbanList list={list} key={list.id} />;
				})}

			<div className='list-wrapper'>
				<ListComposer />
			</div>
		</main>
	);
};

export default React.memo(Board);
