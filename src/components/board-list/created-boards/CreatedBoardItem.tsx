import { OwnedBoard } from '../../../features/boardList/boardSlice';
import CreatedBoardMember from './CreatedBoardMember';
import '../BoardList.css';
import { Link } from 'react-router-dom';

type CreatedBoardItemProps = {
	board: OwnedBoard;
};

const CreatedBoardItem = ({ board }: CreatedBoardItemProps) => {
	return (
		<Link to={`/board/${board.id}`} className='board-list-item-link-wrapper'>
			<article key={board.id} className='board-list-item'>
				<h4 className='board-list-item__title' style={{ opacity: 0.8 }}>
					{board.title}
				</h4>

				<div className='board-list-item__banners'>
					{board.members.length
						? board.members.map((member) => (
								<CreatedBoardMember
									member={member}
									key={member.boardMemberId}
								/>
						  ))
						: null}
				</div>
			</article>
		</Link>
	);
};

export default CreatedBoardItem;
