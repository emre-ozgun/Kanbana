import React from 'react';
import { OwnedBoard } from '../../../features/boardList/boardSlice';
import CreatedBoardItem from './CreatedBoardItem';
import '../BoardList.css';

type CreatedBoardsProps = {
	boards: OwnedBoard[] | [];
};

const CreatedBoards = ({ boards }: CreatedBoardsProps) => {
	if (boards.length < 1) {
		return (
			<div className='board-list-container'>
				<small style={{ opacity: 0.5 }}>
					You haven't added any boards yet. Try adding one!
				</small>
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
