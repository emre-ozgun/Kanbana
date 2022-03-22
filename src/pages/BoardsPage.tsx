import React from 'react';
import Header from '../components/board-list/Header';
import BoardListSection from '../components/board-list/BoardListSection';
import BoardListItem from '../components/board-list/BoardListItem';
import bannerUtil from '../utils/userBannerGenerator';

const BoardsPage = () => {
	return (
		<>
			<Header />
			<section className='section board-list'>
				<div className='board-list-title'>
					<h1>Your Boards</h1>
					<button type='button' className='board-list-title__btn'>
						+ new board
					</button>
				</div>
				<div className='separator'></div>
				<div className='board-list-container'>
					<article className='board-list-item'>
						<h4 className='board-list-item__title'>Design Board</h4>
						<div className='board-list-item__banners'>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('E')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('E')
									)}`,
								}}
							>
								E
							</div>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('E')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('E')
									)}`,
								}}
							>
								E
							</div>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('A')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('A')
									)}`,
								}}
							>
								A
							</div>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('B')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('B')
									)}`,
								}}
							>
								B
							</div>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('Z')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('Z')
									)}`,
								}}
							>
								Z
							</div>
						</div>
					</article>
					<article className='board-list-item'>
						<h4 className='board-list-item__title'>Web Development Project</h4>
						<div className='board-list-item__banners'>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('A')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('A')
									)}`,
								}}
							>
								A
							</div>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('B')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('B')
									)}`,
								}}
							>
								B
							</div>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('Z')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('Z')
									)}`,
								}}
							>
								Z
							</div>
						</div>
					</article>
					<article className='board-list-item'>
						<h4 className='board-list-item__title'>
							data structures and algorithms
						</h4>
						<div className='board-list-item__banners'>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('A')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('A')
									)}`,
								}}
							>
								A
							</div>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('B')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('B')
									)}`,
								}}
							>
								B
							</div>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('Z')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('Z')
									)}`,
								}}
							>
								Z
							</div>
						</div>
					</article>
					<article className='board-list-item'>
						<h4 className='board-list-item__title'>UI/UX Board</h4>
						<div className='board-list-item__banners'>
							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('F')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('F')
									)}`,
								}}
							>
								F
							</div>

							<div
								className='board-list-item__banner'
								style={{
									backgroundColor: `${bannerUtil.generateBanner('Z')}`,
									color: `${bannerUtil.adjustContrast(
										bannerUtil.generateBanner('Z')
									)}`,
								}}
							>
								Z
							</div>
						</div>
					</article>
				</div>
			</section>
		</>
	);
};

export default BoardsPage;
