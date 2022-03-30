import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getCard,
	clearCard,
	deleteCard,
	selectCard,
} from '../../features/cardEdit/cardSlice';
import { deleteBoardCard } from '../../features/board/kanbanSlice';
import useOnClickOutside from '../../utils/useClickOutside';
import Spinner from '../spinner/Spinner';
import CardHeader from './CardHeader';
import CardDescription from './CardDescription';
import CardComment from './CardComment';
import CardLabels from './CardLabels';
import CardDuedate from './CardDuedate';
import CardLabelMaker from './CardLabelMaker';
import CardDateMaker from './CardDateMaker';

import {
	MdOutlineCheckBox,
	MdOutlineAccessTime,
	MdRemove,
} from 'react-icons/md';

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

	const handleDeleteCard = () => {
		dispatch(deleteCard(card.id));
		dispatch(deleteBoardCard({ listId, cardId }));
		navigate(-1);
	};

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
								{(card.labels.length > 0 || card.duedate) && (
									<section className='single-card-misc'>
										{card.labels.length > 0 && (
											<CardLabels labels={card.labels} />
										)}

										{!card.duedate && <CardDuedate duedate={card.duedate} />}
									</section>
								)}

								<CardDescription
									description={card.description}
									listId={listId}
									cardId={card.id}
								/>
								<CardComment
									comments={card.comments}
									listId={listId}
									cardId={card.id}
								/>
							</article>
							<aside className='single-card-sidebar'>
								<h3>Add to card</h3>

								<div className='single-card-sidebar__cta'>
									<CardLabelMaker
										labels={card.labels}
										cardId={card.id}
										listId={listId}
									/>
									<div className='sidebar-link'>
										<MdOutlineCheckBox />

										<span>Checklist</span>
									</div>
									<div className='sidebar-link'>
										<MdOutlineAccessTime />

										<span>Dates</span>
									</div>
									<div
										className='sidebar-link delete'
										onClick={() => handleDeleteCard()}
									>
										<MdRemove />

										<span>Delete Card</span>
									</div>
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
