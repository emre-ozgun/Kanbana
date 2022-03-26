import React, { useState, useRef, useEffect } from 'react';
import useOnClickOutside from '../../../utils/useClickOutside';
import './ListComposer.css';

const ListComposer = () => {
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

	if (isListComposerOpen) {
		return (
			<div
				className={`list-composer ${isListComposerOpen && 'active'}`}
				ref={listComposerRef}
			>
				<form className='list-composer__form'>
					<input
						ref={listComposerInputRef}
						type='text'
						placeholder='Enter list title...'
						className='list-composer__form-input'
					/>

					<div className='list-composer__cta'>
						<button className='list-composer__cta-btn'>Add List</button>
						<button
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
