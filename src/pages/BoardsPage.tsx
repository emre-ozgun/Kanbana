import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/board-list/header/Header';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
	selectBoardList,
	getBoardList,
	createBoard,
} from '../features/boardList/boardSlice';
import Spinner from '../components/spinner/Spinner';
import CreatedBoards from '../components/board-list/created-boards/CreatedBoards';

const BoardsPage = () => {
	const dispatch = useAppDispatch();
	const { boards, isError, isLoading, message } =
		useAppSelector(selectBoardList);

	const [showAddBoardField, setShowAddBoardField] = useState(false);

	useEffect(() => {
		dispatch(getBoardList());
	}, [dispatch]);

	console.log('BOARDS FROM BOARDSPAGE', boards);

	return (
		<>
			<Header />
			{/* <CreatedBoardsTitle/> */}
			<section className='section board-list'>
				<div className='board-list-title'>
					<h1>Your Boards</h1>
					{showAddBoardField ? (
						<AddNewBoard
							setShowAddBoardField={setShowAddBoardField}
							showAddBoardField={showAddBoardField}
						/>
					) : (
						<button
							type='button'
							className='board-list-title__btn'
							onClick={() => setShowAddBoardField(true)}
						>
							+ new board
						</button>
					)}
				</div>
				<div className='separator'></div>

				{isError && (
					<div className='board-list-error'>
						<h5>{message}</h5>
					</div>
				)}

				{isLoading ? (
					<div className='board-list-spinner'>
						<Spinner />
					</div>
				) : (
					<CreatedBoards
						boards={boards.ownedBoards.length ? boards.ownedBoards : []}
					/>
				)}
			</section>
		</>
	);
};

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
		<form className='add-board' onSubmit={(e) => handleAddBoard(e)}>
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

export default BoardsPage;
