import React from 'react';
import ListComposer from './ListComposer';
import {
	Card,
	List,
	updatePosition,
	updatePositionDB,
	updatePositionBetweenLists,
	updatePositionBetweenListsDB,
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

	// * DRAG AND DROP LOGIC (parameter 'result' is not defined by typescript...)
	const onDragEnd = (result: any) => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		) {
			return;
		}

		// *  WITHIN LIST
		if (source.droppableId === destination.droppableId) {
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
						dispatch(
							updatePositionDB({
								updateType: 'within',
								newPosition: pos / 2,
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
						dispatch(
							updatePositionDB({
								updateType: 'within',
								newPosition: pos * 2,
								cardId: Number(draggableId),
							})
						);
					}
				}
			} else {
				// @ insert between
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
						dispatch(
							updatePositionDB({
								updateType: 'within',
								newPosition: pos,
								cardId: Number(draggableId),
							})
						);
					}
				}
			}
			return;
		}

		// * BETWEEN LISTS
		if (source.droppableId !== destination.droppableId) {
			const cardId = Number(draggableId);

			const targetListId = Number(destination.droppableId);
			const sourceListId = Number(source.droppableId);
			const currentCard = sortedLists
				.find((l: List) => l.id === sourceListId)
				?.cards.find((c: Card) => c.id === cardId);
			const targetList = sortedLists.find((l: List) => l.id === targetListId);
			const targetCards = [...targetList?.cards!].sort(
				(a: Card, b: Card) => a.order! - b.order!
			);
			let position = 0;

			if (destination.index === 0 && targetCards?.length! < 1) {
				position = 2 ** 16;
			} else if (destination.index === 0 && targetCards?.length! > 0) {
				console.log('inserting card at first index of another NON-EMPTY list');
				if (targetCards && targetCards[0].order) {
					console.log(targetCards![0].title);
					console.log(targetCards![0].order);
					position = targetCards[0].order / 2;
					// dispatch(
					// 	updatePositionBetweenLists({
					// 		currentCard,
					// 		position,
					// 		targetListId,
					// 		sourceListId,
					// 		cardId,
					// 	})
					// );
					// return;
				}
			} else if (destination.index === targetCards?.length) {
				console.log('inserting card at last index of another NON-EMPTY list');

				if (targetCards && targetCards[destination.index - 1].order) {
					position = targetCards[destination.index - 1].order! * 2;
					// dispatch(
					// 	updatePositionBetweenLists({
					// 		currentCard,
					// 		position,
					// 		targetListId,
					// 		sourceListId,
					// 		cardId,
					// 	})
					// );
					// return;
				}
			} else {
				console.log('this else is also triggered');

				let prev: number = 0;
				let next: number = 0;

				if (destination.index > source.index) {
					console.log('dragged down');
					prev = destination.index - 1;
					next = destination.index;
				} else if (
					destination.index === source.index &&
					destination.index !== 0
				) {
					console.log('same indexes');
					prev = destination.index - 1;
					next = destination.index;
				} else {
					prev = destination.index - 1;
					next = destination.index;
					console.log('dragged up');
				}

				position =
					(targetCards![prev]!.order! + targetCards![next]!.order!) / 2;

				console.log(prev, next);

				console.log('inserting card at between cards of another list');
			}

			// * Remove card from sourceList
			// * Insert card at calculated position to targetList without losing its information

			// UI STATE
			dispatch(
				updatePositionBetweenLists({
					currentCard,
					position,
					targetListId,
					sourceListId,
					cardId,
				})
			);
			dispatch(
				updatePositionBetweenListsDB({
					currentCard,
					position,
					targetListId,

					cardId,
				})
			);

			// SERVER STATE

			// dispatch(updatePositonBetweenListsDB(currentCard, position, targetListId, sourceListId, cardId));

			// LOGIC
			//  * 1) remove with card id (remove card from source list)
			//  * 2) create in target list with position
			//  ! WHILE CREATING, DON'T LOSE CARD INFO, CREATE WITH ALL THE INFORMATION AVAILABLE!

			// 	console.log('moving card between lists...');
			// console.log({ source, destination, draggableId });
		}
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
