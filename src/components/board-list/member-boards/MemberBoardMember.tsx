import bannerUtil from '../../../utils/userBannerGenerator';
import { Member } from '../../../features/boardList/boardSlice';
import '../BoardList.css';

type MemberBoardMemberProps = {
	member: Member;
};

const MemberBoardMember = ({ member }: MemberBoardMemberProps) => {
	return (
		<div
			key={member.boardMemberId}
			className='board-list-item__banner'
			style={{
				backgroundColor: `${bannerUtil.generateBanner(
					`${member.username.slice(0, 1)}`
				)}`,
				color: `${bannerUtil.adjustContrast(
					bannerUtil.generateBanner(`${member.username.slice(0, 1)}`)
				)}`,
			}}
		>
			{member.username.slice(0, 1).toUpperCase()}
		</div>
	);
};

export default MemberBoardMember;
