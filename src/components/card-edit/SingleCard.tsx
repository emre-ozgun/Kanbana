import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCard, clearCard } from '../../features/cardEdit/cardSlice';
import useOnClickOutside from '../../utils/useClickOutside';
import { selectCard } from '../../features/cardEdit/cardSlice';
import Spinner from '../spinner/Spinner';
import CardHeader from './CardHeader';
import CardDescription from './CardDescription';
import CardComment from './CardComment';

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

		return () => {
			dispatch(clearCard());
		};
	}, [dispatch, cardId]);

	console.log({ description: card.description });

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
							<article className='single-card-main'>
								<CardDescription
									description={card.description}
									listId={listId}
									cardId={card.id}
								/>
								<CardComment comments={card.comments} listId={listId} />
							</article>
							<aside className='single-card-sidebar'>
								<h4>Add to card</h4>
								<div className='separator'></div>
								<div className='single-card-sidebar__cta'>
									<div>Labels</div>
									<div>Checklist</div>
									<div>Dates</div>
								</div>
							</aside>
						</section>
					</>
				)}
			</main>
		</div>
	);
};

export default React.memo(SingleCard);
