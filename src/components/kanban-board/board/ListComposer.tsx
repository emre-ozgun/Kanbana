import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addList } from '../../../features/board/kanbanSlice';
import { useAppDispatch } from '../../../hooks';
import useOnClickOutside from '../../../utils/useClickOutside';
import './ListComposer.css';

const ListComposer = () => {
	const dispatch = useAppDispatch();
	const { boardId } = useParams();

	const [listTitle, setListTitle] = useState('');
	const [isListComposerOpen, setIsListComposerOpen] = useState(false);

	const listComposerRef = useRef<null | HTMLDivElement>(null);
	const listComposerInputRef = useRef<null | HTMLInputElement>(null);

	useOnClickOutside(listComposerRef, () => setIsListComposerOpen(false));

	useEffect(() => {
		if (isListComposerOpen) {
			if (listComposerInputRef && listComposerInputRef.current) {
				listComposerInputRef?.current?.focus();
			}
		}
	}, [isListComposerOpen]);

	const handleAddList = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (listTitle) {
			dispatch(addList({ boardId, listTitle }));

			setListTitle('');
			setIsListComposerOpen(false);
		} else {
			return;
		}
	};

	if (isListComposerOpen) {
		return (
			<div
				className={`list-composer ${isListComposerOpen && 'active'}`}
				ref={listComposerRef}
			>
				<form
					className='list-composer__form'
					onSubmit={(e) => handleAddList(e)}
				>
					<input
						ref={listComposerInputRef}
						type='text'
						placeholder='Enter list title...'
						className='list-composer__form-input'
						value={listTitle}
						onChange={(e) => setListTitle(e.target.value)}
					/>

					<div className='list-composer__cta'>
						<button type='submit' className='list-composer__cta-btn'>
							Add List
						</button>
						<button
							type='button'
							onClick={() => setIsListComposerOpen(false)}
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
		<div className='list-composer' onClick={() => setIsListComposerOpen(true)}>
			+ Add new list
		</div>
	);
};

export default ListComposer;
