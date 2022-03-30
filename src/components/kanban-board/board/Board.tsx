import React from 'react';
import ListComposer from './ListComposer';
import {
	Card,
	List,
	updatePosition,
} from '../../../features/board/kanbanSlice';
import KanbanList from '../list/List';
import { DragDropContext } from 'react-beautiful-dnd';

import './Board.css';
import { useAppDispatch } from '../../../hooks';

type ListType = {
	lists: List[];
};

const Board = ({ lists }: ListType) => {
	const dispatch = useAppDispatch();

	const sortedLists = React.useMemo(() => {
		return [...lists].sort((a: List, b: List) => a.order! - b.order!);
	}, [lists]);

	const onDragEnd = (result: any) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (destination.index === source.index) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			// TODO -> WITHIN THE SAME LIST

			const targetList = sortedLists.find(
				(l: List) => l.id === Number(destination.droppableId)
			);

			const targetCards = [...targetList?.cards!].sort(
				(a: Card, b: Card) => a.order! - b.order!
			);

			// inser @ start
			if (destination.index === 0) {
				if (targetCards) {
					let pos = targetCards[0].order;
					if (typeof pos === 'number') {
						dispatch(
							updatePosition({
								updateType: 'within',
								newPosition: pos / 2,
								listId: Number(destination.droppableId),
								cardId: Number(draggableId),
							})
						);
					}
				}

				// insert @ end
			} else if (destination.index === targetCards?.length! - 1) {
				if (targetCards) {
					let pos = targetCards[targetCards?.length! - 1].order;
					if (typeof pos === 'number') {
						dispatch(
							updatePosition({
								updateType: 'within',
								newPosition: pos * 2,
								listId: Number(destination.droppableId),
								cardId: Number(draggableId),
							})
						);
					}
				}
			} else {
				let prev: number = 0;
				let next: number = 0;

				if (destination.index < source.index) {
					prev = destination.index - 1;
					next = destination.index;
				} else {
					prev = destination.index;
					next = destination.index + 1;
				}

				if (targetCards) {
					let posPrev = targetCards[prev].order;
					let postNext = targetCards[next].order;

					console.log(targetCards[prev].title);
					console.log(targetCards[next].title);

					let pos;

					if (posPrev && postNext) {
						pos = (posPrev + postNext) / 2;
					}

					if (typeof pos === 'number') {
						dispatch(
							updatePosition({
								updateType: 'within',
								newPosition: pos,
								listId: Number(destination.droppableId),
								cardId: Number(draggableId),
							})
						);
					}
				}

				// insert between
			}
		}

		if (source.droppableId !== destination.droppableId) {
			// TODO -> BETWEEN LISTS
		}

		console.log({
			destination,
			source,
			draggableId,
		});

		//reordering logic
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
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
		</DragDropContext>
	);
};

export default React.memo(Board);
