import { MemberBoard } from '../../../features/boardList/boardSlice';
import MemberBoardMember from './MemberBoardMember';
import '../BoardList.css';
import { Link } from 'react-router-dom';

type CreatedBoardItemProps = {
	board: MemberBoard;
};

const MemberBoardItem = ({ board }: CreatedBoardItemProps) => {
	return (
		<Link to={`/board/${board.id}`} className='board-list-item-link-wrapper'>
			<article className='board-list-item' key={board.id}>
				<h4 className='board-list-item__title' style={{ opacity: 0.8 }}>
					{board.title}
				</h4>
				<div className='board-list-item__banners'>
					{board.members.length
						? board.members.map((member) => (
								<MemberBoardMember member={member} key={member.boardMemberId} />
						  ))
						: null}
				</div>
			</article>
		</Link>
	);
};

export default MemberBoardItem;
