import React from 'react';
import ListComposer from './ListComposer';
import { List } from '../../../features/board/kanbanSlice';
import KanbanList from '../list/List';
import { DragDropContext } from 'react-beautiful-dnd';

import './Board.css';

type ListType = {
	lists: List[];
};

const Board = ({ lists }: ListType) => {
	const sortedLists = React.useMemo(() => {
		return [...lists].sort((a: List, b: List) => a.order! - b.order!);
	}, [lists]);

	return (
		<main className='board'>
			{sortedLists &&
				sortedLists.length > 0 &&
				sortedLists.map((list: List) => {
					return <KanbanList list={list} key={list.id} />;
				})}

			<div className='list-wrapper'>
				<ListComposer />
			</div>
		</main>
	);
};

export default React.memo(Board);
