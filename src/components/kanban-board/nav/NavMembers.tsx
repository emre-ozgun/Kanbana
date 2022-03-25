import React, { useRef } from 'react';
import bannerUtil from '../../../utils/userBannerGenerator';
import { FaTimes } from 'react-icons/fa';
import useOnClickOutside from '../../../utils/useClickOutside';
import { BoardMember } from '../../../features/board/kanbanSlice';
import { useAppDispatch } from '../../../hooks';
import { leaveBoard } from '../../../features/board/kanbanSlice';
import './NavMembers.css';

type NavMembersProps = {
	isMembersOpen: boolean;
	setIsMembersOpen: React.Dispatch<React.SetStateAction<boolean>>;
	members: BoardMember[];
};

const NavMembers = ({
	isMembersOpen,
	setIsMembersOpen,
	members,
}: NavMembersProps) => {
	const membersRef = useRef<null | HTMLDivElement>(null);

	useOnClickOutside(membersRef, () => setIsMembersOpen(false));

	const dispatch = useAppDispatch();

	return (
		<div
			className={`nav-members ${isMembersOpen && 'active'}`}
			ref={membersRef}
		>
			{members.length > 0 ? (
				members.map((member: BoardMember) => {
					return (
						<div className='nav-members__member' key={member.boardMemberId}>
							<div
								className='member-banner'
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
							<div className='member-name'>{member.username}</div>
							<div
								className='member-delete'
								onClick={() => dispatch(leaveBoard(member.boardMemberId))}
							>
								<FaTimes />
							</div>
						</div>
					);
				})
			) : (
				<div className='nav-members__member'>
					<small>You don't have any members, try inviting someone!</small>
				</div>
			)}
		</div>
	);
};

export default React.memo(NavMembers);
