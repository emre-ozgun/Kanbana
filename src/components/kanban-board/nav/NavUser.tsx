import React, { useRef } from 'react';
import useOnClickOutside from '../../../utils/useClickOutside';
import { useAppDispatch } from '../../../hooks';
import { leaveBoard, deleteBoard } from '../../../features/board/kanbanSlice';
import bannerUtil from '../../../utils/userBannerGenerator';
import './NavUser.css';
import { useNavigate } from 'react-router-dom';

type NavInviteProps = {
	isUserOpen: boolean;
	setIsUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
	username: string | undefined;
	userId: number | undefined;
	navFields: any;
};

const NavUser = ({
	isUserOpen,
	setIsUserOpen,
	username,
	userId,
	navFields,
}: NavInviteProps) => {
	const navigate = useNavigate();
	const userRef = useRef<null | HTMLDivElement>(null);

	useOnClickOutside(userRef, () => setIsUserOpen(false));
	const dispatch = useAppDispatch();

	const handleDeleteBoard = () => {
		dispatch(deleteBoard(navFields.id));
		navigate('/boards');
	};

	const handleLeaveBoard = () => {
		const findBoardMemberId = navFields.members.find(
			(m: any) => m.username === username
		);
		if (findBoardMemberId) {
			dispatch(leaveBoard(findBoardMemberId.boardMemberId));
			navigate('/boards');
		}
	};

	return (
		<div className={`nav-user ${isUserOpen && 'active'}`} ref={userRef}>
			<div className='nav-user__info'>
				<div
					className='nav-user__info-banner'
					style={{
						backgroundColor: `${bannerUtil.generateBanner(
							`${username?.slice(0, 1)}`
						)}`,
						color: `${bannerUtil.adjustContrast(
							bannerUtil.generateBanner(`${username?.slice(0, 1)}`)
						)}`,
					}}
				>
					{username?.slice(0, 1)}
				</div>
				<div className='nav-user__info-name'>{username}</div>
			</div>
			<div className='nav-user-separator'></div>

			{userId === navFields.ownerId ? (
				<button type='button' onClick={handleDeleteBoard}>
					Delete this board
				</button>
			) : (
				<button type='button' onClick={handleLeaveBoard}>
					Leave
				</button>
			)}
		</div>
	);
};

export default React.memo(NavUser);
