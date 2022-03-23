import React from 'react';
import { MemberBoard } from '../../../features/boardList/boardSlice';
import MemberBoardItem from './MemberBoardItem';
import '../BoardList.css';

type MemberBoardsProps = {
	boards: MemberBoard[] | [];
};

const MemberBoards = ({ boards }: MemberBoardsProps) => {
	if (boards.length < 1) {
		return (
			<div className='board-list-container'>
				<small style={{ opacity: 0.5 }}>
					You're not a member of any board. Ask other users for an invite!
				</small>
			</div>
		);
	}

	return (
		<div className='board-list-container'>
			{boards.map((board: MemberBoard) => (
				<MemberBoardItem board={board} key={board.id} />
			))}
		</div>
	);
};

export default React.memo(MemberBoards);
