import { FaTrello } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavMembers from './NavMembers';
import NavInvite from './NavInvite';
import NavUser from './NavUser';
import NavTitle from './NavTitle';
import { useAppSelector } from '../../../hooks';
import { selectAuth } from '../../../features/auth/authSlice';
import bannerUtil from '../../../utils/userBannerGenerator';
import { BoardMember } from '../../../features/board/kanbanSlice';
import './Navbar.css';

export type NavFieldsProps = {
	navFields: {
		id: number;
		title: string;
		ownerId: number;
		members: BoardMember[];
	};
};

const KanbanNavbar = ({ navFields }: NavFieldsProps) => {
	const [isMembersOpen, setIsMembersOpen] = useState(false);
	const [isInviteOpen, setIsInviteOpen] = useState(false);
	const [isUserOpen, setIsUserOpen] = useState(false);
	const [isTitleOnEditMode, setIsTitleOnEditMode] = useState(false);

	const { user } = useAppSelector(selectAuth);

	return (
		<>
			<header className='kanban-header'>
				<nav className='kanban-nav'>
					<div className='nav-wrapper'>
						<div className='nav-item'>
							<Link to='/boards' className='nav-boards'>
								<FaTrello />
								Boards
							</Link>
						</div>
						<div
							className='nav-wrapper nav-wrapper__title'
							onClick={() => setIsTitleOnEditMode(true)}
						>
							<NavTitle
								isTitleOnEditMode={isTitleOnEditMode}
								setIsTitleOnEditMode={setIsTitleOnEditMode}
								title={navFields.title}
								boardId={navFields.id}
							/>
						</div>
					</div>

					<div className='nav-wrapper'>
						{user?.id === navFields.ownerId && (
							<>
								<div className='nav-item'>
									<button
										onClick={() => {
											setIsMembersOpen(true);
										}}
									>
										Members
									</button>
								</div>

								<div className='nav-item'>
									<button onClick={() => setIsInviteOpen(true)}>
										+ Invite
									</button>
								</div>
							</>
						)}

						<div className='nav-item'>
							<button
								className='nav-item__user'
								onClick={() => setIsUserOpen(true)}
								style={{
									backgroundColor: `${bannerUtil.generateBanner(
										`${user?.username.slice(0, 1)}`
									)}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner(`${user?.username.slice(0, 1)}`)
									)}`,
								}}
							>
								{user?.username.slice(0, 1)}
							</button>
						</div>
					</div>
				</nav>
			</header>
			<NavMembers
				isMembersOpen={isMembersOpen}
				setIsMembersOpen={setIsMembersOpen}
				members={navFields.members}
			/>
			<NavInvite
				isInviteOpen={isInviteOpen}
				setIsInviteOpen={setIsInviteOpen}
				ownerId={navFields.ownerId}
				members={navFields.members}
			/>
			<NavUser
				isUserOpen={isUserOpen}
				setIsUserOpen={setIsUserOpen}
				username={user?.username}
				userId={user?.id}
				navFields={navFields}
			/>
		</>
	);
};

export default KanbanNavbar;
