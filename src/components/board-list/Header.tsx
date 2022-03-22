import './Header.css';
import bannerUtil from '../../utils/userBannerGenerator';

const Header = () => {
	return (
		<header className='board-list-header'>
			<nav className='board-list-nav'>
				<div className='board-list-logo'>KANBANA</div>
				<div className='board-list-nav__cta'>
					<div className='board-list-user'>
						<div
							className='user-color'
							style={{
								backgroundColor: `${bannerUtil.generateBanner('E')}`,
								color: bannerUtil.adjustContrast(
									bannerUtil.generateBanner('E')
								),
							}}
						>
							E
						</div>
						<div className='user-name'>emreozgun</div>
					</div>
					<button type='button' className='board-list-nav__btn'>
						logout
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
