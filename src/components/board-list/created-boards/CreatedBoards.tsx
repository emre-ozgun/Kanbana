import React from 'react';
import { OwnedBoard } from '../../../features/boardList/boardSlice';
import CreatedBoardItem from './CreatedBoardItem';

type CreatedBoardsProps = {
	boards: OwnedBoard[] | [];
};

const CreatedBoards = ({ boards }: CreatedBoardsProps) => {
	if (boards.length < 1) {
		return (
			<div className='board-list-container'>
				<h4>Your board list is currently empty, try adding one...</h4>
			</div>
		);
	}

	return (
		<div className='board-list-container'>
			{boards.map((board: OwnedBoard) => (
				<CreatedBoardItem board={board} key={board.id} />
			))}
		</div>
	);
};

export default React.memo(CreatedBoards);
