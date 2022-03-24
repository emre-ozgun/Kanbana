import React, { useRef } from 'react';
import bannerUtil from '../../../utils/userBannerGenerator';
import { FaTimes } from 'react-icons/fa';
import useOnClickOutside from '../../../utils/useClickOutside';
import './NavMembers.css';

type NavMembersProps = {
	isMembersOpen: boolean;
	setIsMembersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavMembers = ({ isMembersOpen, setIsMembersOpen }: NavMembersProps) => {
	const membersRef = useRef<null | HTMLDivElement>(null);

	useOnClickOutside(membersRef, () => setIsMembersOpen(false));

	return (
		<div
			className={`nav-members ${isMembersOpen && 'active'}`}
			ref={membersRef}
		>
			<div className='nav-members__member'>
				<div
					className='member-banner'
					style={{
						backgroundColor: `${bannerUtil.generateBanner('E')}`,
						color: `${bannerUtil.adjustContrast(
							bannerUtil.generateBanner('E')
						)}`,
					}}
				>
					E
				</div>
				<div className='member-name'>emre</div>

				<div className='member-delete' onClick={() => setIsMembersOpen(false)}>
					<FaTimes />
				</div>
			</div>
			<div className='nav-members__member'>
				<div
					className='member-banner'
					style={{
						backgroundColor: `${bannerUtil.generateBanner('Z')}`,
						color: `${bannerUtil.adjustContrast(
							bannerUtil.generateBanner('Z')
						)}`,
					}}
				>
					Z
				</div>
				<div className='member-name'>Zafer</div>
				<div className='member-delete'>
					<FaTimes />
				</div>
			</div>
			<div className='nav-members__member'>
				<div
					className='member-banner'
					style={{
						backgroundColor: `${bannerUtil.generateBanner('H')}`,
						color: `${bannerUtil.adjustContrast(
							bannerUtil.generateBanner('H')
						)}`,
					}}
				>
					H
				</div>
				<div className='member-name'>Hakan</div>
				<div className='member-delete'>
					<FaTimes />
				</div>
			</div>
		</div>
	);
};

export default React.memo(NavMembers);
