import React, { useRef } from 'react';
import useOnClickOutside from '../../../utils/useClickOutside';
import { useAppSelector } from '../../../hooks';
import bannerUtil from '../../../utils/userBannerGenerator';
import './NavUser.css';

type NavInviteProps = {
	isUserOpen: boolean;
	setIsUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
	username: string | undefined;
};

const NavUser = ({ isUserOpen, setIsUserOpen, username }: NavInviteProps) => {
	const userRef = useRef<null | HTMLDivElement>(null);

	useOnClickOutside(userRef, () => setIsUserOpen(false));

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
			<button type='button'>Delete this board</button>
		</div>
	);
};

export default NavUser;
