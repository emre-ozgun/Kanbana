import { FaTrello } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavMembers from './NavMembers';
import NavInvite from './NavInvite';
import NavUser from './NavUser';
import './Navbar.css';
import { useAppSelector } from '../../../hooks';
import { selectAuth } from '../../../features/auth/authSlice';
import bannerUtil from '../../../utils/userBannerGenerator';

const KanbanNavbar = () => {
	const [isMembersOpen, setIsMembersOpen] = useState(false);
	const [isInviteOpen, setIsInviteOpen] = useState(false);
	const [isUserOpen, setIsUserOpen] = useState(false);

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
						<div className='nav-item'>
							{/* <BoardTitle/> */}
							{/* editable title -> onblur */}
						</div>
					</div>
					<div className='nav-wrapper'>Development Board</div>

					<div className='nav-wrapper'>
						<div className='nav-item'>
							<button
								onClick={() => {
									setIsMembersOpen(true);
								}}
							>
								Members
							</button>
							{/* <BoardMembers/> */}
						</div>
						<div className='nav-item'>
							<button>+ Invite</button>
							{/* <AddMember/> */}
						</div>

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
			/>
			<NavInvite
				isInviteOpen={isInviteOpen}
				setIsInviteOpen={setIsInviteOpen}
			/>
			<NavUser
				isUserOpen={isUserOpen}
				setIsUserOpen={setIsUserOpen}
				username={user?.username}
			/>
		</>
	);
};

export default KanbanNavbar;
