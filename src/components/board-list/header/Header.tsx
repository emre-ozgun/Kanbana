import { useAppDispatch, useAppSelector } from '../../../hooks';
import { logout, selectAuth } from '../../../features/auth/authSlice';
import bannerUtil from '../../../utils/userBannerGenerator';
import '../BoardList.css';

const Header = () => {
	const { user } = useAppSelector(selectAuth);
	const dispatch = useAppDispatch();

	return (
		<header className='board-list-header'>
			<nav className='board-list-nav'>
				<div className='board-list-logo'>KANBANA</div>
				<div className='board-list-nav__cta'>
					<div className='board-list-user'>
						<div
							className='user-color'
							style={{
								backgroundColor: `${bannerUtil.generateBanner(
									`${user?.username.slice(0, 1)}`
								)}`,
								color: bannerUtil.adjustContrast(
									bannerUtil.generateBanner(`${user?.username.slice(0, 1)}`)
								),
							}}
						>
							{user?.username.slice(0, 1).toUpperCase()}
						</div>
						<div className='user-name'>{user?.username}</div>
					</div>
					<button
						type='button'
						className='board-list-nav__btn'
						onClick={() => dispatch(logout())}
					>
						logout
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
