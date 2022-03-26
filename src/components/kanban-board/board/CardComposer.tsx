import React, { useRef, useEffect, useState } from 'react';
import useOnClickOutside from '../../../utils/useClickOutside';
import './CardComposer.css';

const CardComposer = () => {
	const [isCardComposerOpen, setIsCardComposerOpen] = useState(false);

	const cardComposerRef = useRef<null | HTMLDivElement>(null);
	const cardComposerInputRef = useRef<null | HTMLTextAreaElement>(null);

	useOnClickOutside(cardComposerRef, () => setIsCardComposerOpen(false));

	useEffect(() => {
		if (isCardComposerOpen) {
			if (cardComposerInputRef && cardComposerInputRef.current) {
				cardComposerInputRef?.current?.focus();
			}
		}
	}, [isCardComposerOpen]);

	if (isCardComposerOpen) {
		return (
			<div
				className={`list-composer ${
					isCardComposerOpen && 'active card-active'
				}`}
				ref={cardComposerRef}
			>
				<form className='list-composer__form'>
					<textarea
						ref={cardComposerInputRef}
						placeholder='Enter a title for this card...'
						className='card-composer__form-textarea'
					/>
					<div className='list-composer__cta'>
						<button className='list-composer__cta-btn'>Add Card</button>
						<button
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
