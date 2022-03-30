import React, { useRef, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { addCard } from '../../../features/board/kanbanSlice';
import useOnClickOutside from '../../../utils/useClickOutside';
import './CardComposer.css';

type CardComposerProps = {
	listId: number;
};

const CardComposer = ({ listId }: CardComposerProps) => {
	const dispatch = useAppDispatch();

	const [isCardComposerOpen, setIsCardComposerOpen] = useState(false);

	const [cardTitle, setCardTite] = useState('');

	const cardComposerRef = useRef<null | HTMLDivElement>(null);
	const cardComposerInputRef = useRef<null | HTMLTextAreaElement>(null);

	useOnClickOutside(cardComposerRef, () => setIsCardComposerOpen(false));

	useEffect(() => {
		if (isCardComposerOpen) {
			if (cardComposerInputRef && cardComposerInputRef.current) {
				cardComposerInputRef?.current?.focus();
			}
		} else {
			setCardTite('');
		}
	}, [isCardComposerOpen]);

	const handleAddCard = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (cardTitle) {
			dispatch(addCard({ listId, cardTitle }));
			setCardTite('');
			setIsCardComposerOpen(false);
		} else {
			cardComposerInputRef?.current?.focus();
			return;
		}
	};

	if (isCardComposerOpen) {
		return (
			<div
				className={`list-composer ${
					isCardComposerOpen && 'active card-active'
				}`}
				ref={cardComposerRef}
			>
				<form
					className='list-composer__form'
					onSubmit={(e) => handleAddCard(e)}
				>
					<textarea
						ref={cardComposerInputRef}
						placeholder='Enter a title for this card...'
						className='card-composer__form-textarea'
						value={cardTitle}
						onChange={(e) => setCardTite(e.target.value)}
					/>
					<div className='list-composer__cta'>
						<button type='submit' className='list-composer__cta-btn'>
							Add Card
						</button>
						<button
							type='button'
							onClick={() => setIsCardComposerOpen(false)}
							className='list-composer__cta-btn-close'
						>
							X
						</button>
					</div>
				</form>
			</div>
		);
	}

	return (
		<div className='card-composer' onClick={() => setIsCardComposerOpen(true)}>
			+ Add a card
		</div>
	);
};

export default CardComposer;
