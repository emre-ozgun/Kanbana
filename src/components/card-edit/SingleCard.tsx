import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCard } from '../../features/cardEdit/cardSlice';
import useOnClickOutside from '../../utils/useClickOutside';
import { selectCard } from '../../features/cardEdit/cardSlice';

import './SingleCard.css';

const SingleCard = () => {
	const dispatch = useAppDispatch();
	const card = useAppSelector(selectCard);
	const { cardId } = useParams();
	const navigate = useNavigate();
	const cardRef = useRef<null | HTMLDivElement>(null);
	useOnClickOutside(cardRef, () => navigate(-1));

	useEffect(() => {
		dispatch(getCard(cardId));
	}, [dispatch, cardId]);

	// console.log(card);

	return (
		<div className='overlay'>
			<main className='single-card' ref={cardRef}>
				{/* <SingeCardTitle title={card.title}/> */}
				<header className='single-card__title'></header>
				<section className='single-card__container'>
					<article className='single-card-main'></article>
					<aside className='single-card-sidebar'></aside>
				</section>
			</main>
		</div>
	);
};

export default React.memo(SingleCard);
