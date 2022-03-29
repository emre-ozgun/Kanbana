import React, { useState, useRef, useEffect } from 'react';
import { MdSubject, MdClose } from 'react-icons/md';
import { useAppDispatch } from '../../hooks';
import { updateCardDescription } from '../../features/cardEdit/cardSlice';
import { updateBoardCardDescription } from '../../features/board/kanbanSlice';
import useOnClickOutside from '../../utils/useClickOutside';

type CardDescriptionPropsType = {
	description: null | string;
	listId: string | undefined;
	cardId: number;
};

const CardDescription = ({
	description,
	listId,
	cardId,
}: CardDescriptionPropsType) => {
	const dispatch = useAppDispatch();

	const descriptionRef = useRef<null | HTMLDivElement>(null);

	const textareaRef = useRef<null | HTMLTextAreaElement>(null);

	const [descriptionEditing, setDescriptionEditing] = useState(false);

	const [descriptionText, setDescriptionText] = useState('');

	const handler = () => {
		submitCardDescription();
	};

	useOnClickOutside(descriptionRef, handler);

	useEffect(() => {
		if (descriptionEditing) {
			textareaRef?.current?.focus();
			textareaRef?.current?.select();
		}

		if (description) {
			setDescriptionText(description);
		} else {
			setDescriptionText('');
		}
	}, [descriptionEditing, description]);

	const submitCardDescription = () => {
		if (descriptionText === description) {
			setDescriptionEditing(false);
			return;
		} else {
			dispatch(
				updateCardDescription({
					cardId,
					newDescription: descriptionText || null,
				})
			);
			dispatch(updateBoardCardDescription({ listId, cardId, descriptionText }));
		}

		setDescriptionText('');
		setDescriptionEditing(false);
	};

	return (
		<>
			<section className='single-card__title'>
				<div className='single-card__title-icon'>
					<MdSubject />
				</div>

				<div className='single-card__title-text'>
					<h4>Description</h4>
				</div>
			</section>

			{!descriptionEditing && !descriptionText && (
				<div
					className='description-cta'
					onClick={(e) => setDescriptionEditing(true)}
				>
					Add a more detailed description...
				</div>
			)}

			{!descriptionEditing && descriptionText && (
				<div
					className='description-value'
					onClick={() => setDescriptionEditing(true)}
				>
					{description}
				</div>
			)}

			{descriptionEditing && (
				<div className='description-cta editing' ref={descriptionRef}>
					<textarea
						value={descriptionText}
						onChange={(e) => setDescriptionText(e.target.value)}
						ref={textareaRef}
						className='description-textarea'
						placeholder='Add a more detailed description...'
					></textarea>

					<div className='description-fields'>
						<button className='description-btn-save' onClick={() => handler()}>
							Save
						</button>
						<button
							className='description-btn-close'
							onClick={() => {
								setDescriptionEditing(false);
								setDescriptionText('');
							}}
						>
							<MdClose />
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default CardDescription;
