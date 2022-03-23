import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../hooks';
import { createBoard } from '../../../features/boardList/boardSlice';
import useOnClickOutside from '../../../utils/useClickOutside';
import '../BoardList.css';

type AddNewBoardType = {
	setShowAddBoardField: React.Dispatch<React.SetStateAction<boolean>>;
	showAddBoardField: boolean;
};

const AddNewBoard = ({
	setShowAddBoardField,
	showAddBoardField,
}: AddNewBoardType) => {
	const [newBoardTitle, setNewBoardTitle] = useState('');
	const dispatch = useAppDispatch();

	const inputRef = useRef<null | HTMLInputElement>(null);
	const boardRef = useRef<null | HTMLFormElement>(null);

	useOnClickOutside(boardRef, () => setShowAddBoardField(false));

	useEffect(() => {
		if (showAddBoardField) {
			if (inputRef) {
				inputRef.current?.focus();
			}
		}
	}, [showAddBoardField]);

	const handleAddBoard = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newBoardTitle) {
			// * CreateBoard service
			dispatch(createBoard(newBoardTitle));
			setNewBoardTitle('');
			setShowAddBoardField(false);
		} else {
			setShowAddBoardField(true);
			inputRef.current?.focus();
			return;
		}
	};

	return (
		<form
			className='add-board'
			onSubmit={(e) => handleAddBoard(e)}
			ref={boardRef}
		>
			<div className='add-board__input'>
				<input
					ref={inputRef}
					type='text'
					placeholder='Enter board title...'
					value={newBoardTitle}
					onChange={(e) => setNewBoardTitle(e.target.value)}
					// onBlur={() => setShowAddBoardField(false)}
				/>
			</div>
			<div className='add-board__cta'>
				<button type='submit'>Add board</button>
				<button
					type='button'
					onClick={(e) => {
						setShowAddBoardField(false);
					}}
				>
					X
				</button>
			</div>
		</form>
	);
};

export default AddNewBoard;
