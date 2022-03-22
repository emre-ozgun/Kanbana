import { OwnedBoard } from '../../../features/boardList/boardSlice';
import CreatedBoardMember from './CreatedBoardMember';

type CreatedBoardItemProps = {
	board: OwnedBoard;
};

const CreatedBoardItem = ({ board }: CreatedBoardItemProps) => {
	return (
		<article className='board-list-item' key={board.id}>
			<h4 className='board-list-item__title' style={{ opacity: 0.8 }}>
				{board.title}
			</h4>
			<div className='board-list-item__banners'>
				{
					board.members.length
						? board.members.map((member) => (
								<CreatedBoardMember
									member={member}
									key={member.boardMemberId}
								/>
						  ))
						: null

					// <button
					// 	className='invite-member-btn'
					// 	style={{ marginLeft: 'auto', display: 'inline-block' }}
					// >
					// 	Invite
					// </button>
				}
			</div>
		</article>
	);
};

export default CreatedBoardItem;
