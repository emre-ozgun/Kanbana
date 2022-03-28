import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCard } from '../../features/cardEdit/cardSlice';
import useOnClickOutside from '../../utils/useClickOutside';
import { selectCard } from '../../features/cardEdit/cardSlice';
import Spinner from '../spinner/Spinner';
import CardHeader from './CardHeader';
import './SingleCard.css';

const SingleCard = () => {
	const dispatch = useAppDispatch();
	const { card, isLoading, isSuccess } = useAppSelector(selectCard);
	const { cardId, listId } = useParams();
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
				{isLoading && (
					<div className='single-card-spinner'>
						<Spinner />
					</div>
				)}

				{isSuccess && (
					<>
						<CardHeader title={card.title} cardId={card.id} listId={listId} />

						<section className='single-card__container'>
							<article className='single-card-main'></article>
							<aside className='single-card-sidebar'></aside>
						</section>
					</>
				)}
			</main>
		</div>
	);
};

export default React.memo(SingleCard);
