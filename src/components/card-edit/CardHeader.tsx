import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineCreditCard } from 'react-icons/md';
import { useAppDispatch } from '../../hooks';
import { updateCardTitle } from '../../features/cardEdit/cardSlice';
import { updateBoardCardTitle } from '../../features/board/kanbanSlice';
import './SingleCard.css';

type CardHeaderPropsType = {
	title: string;
	cardId: number;
	listId: string | undefined;
};

const CardHeader = ({ title, cardId, listId }: CardHeaderPropsType) => {
	const dispatch = useAppDispatch();
	const [cartTitleEdit, setCartTitleEdit] = useState(false);

	const [titleEdit, setTitleEdit] = useState('');
	const titleRef = useRef<null | HTMLInputElement>(null);

	useEffect(() => {
		if (cartTitleEdit) {
			setTitleEdit(title);
			if (titleRef && titleRef.current) {
				titleRef.current.focus();
			}
		}
	}, [cartTitleEdit, title]);

	const handleTitleEditOnBlur = () => {
		if (titleEdit === title) {
			setCartTitleEdit(false);
		} else if (!titleEdit) {
			setCartTitleEdit(false);
		} else {
			dispatch(updateCardTitle({ cardId, newTitle: titleEdit }));
			dispatch(updateBoardCardTitle({ listId, cardId, titleEdit }));
			setCartTitleEdit(false);
		}
	};

	return (
		<section className='single-card__title'>
			<div className='single-card__title-icon'>
				<MdOutlineCreditCard />
			</div>

			{cartTitleEdit ? (
				<div className='single-card__title-text'>
					<input
						ref={titleRef}
						onChange={(e) => setTitleEdit(e.target.value)}
						value={titleEdit}
						type='text'
						onBlur={() => handleTitleEditOnBlur()}
					/>
				</div>
			) : (
				<div
					className='single-card__title-text'
					onClick={() => setCartTitleEdit(true)}
				>
					<h3>{title}</h3>
				</div>
			)}
		</section>
	);
};

export default CardHeader;
