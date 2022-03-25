import { useState, useRef, useEffect } from 'react';
import { editBoardTitle } from '../../../features/board/kanbanSlice';
import { useAppDispatch } from '../../../hooks';
import './NavTitle.css';

type NavTitleProps = {
	isTitleOnEditMode: boolean;
	setIsTitleOnEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
	boardId: number;
};

const NavTitle = ({
	isTitleOnEditMode,
	setIsTitleOnEditMode,
	title,
	boardId,
}: NavTitleProps) => {
	const dispatch = useAppDispatch();
	const [newTitle, setNewTitle] = useState('');
	const inputRef = useRef<null | HTMLInputElement>(null);

	useEffect(() => {
		if (isTitleOnEditMode) {
			inputRef?.current?.focus();
		}
	}, [isTitleOnEditMode]);

	useEffect(() => {
		setNewTitle(title);
	}, [title]);

	const handleEditBoardTitle = () => {
		if (newTitle !== title && newTitle !== '') {
			dispatch(editBoardTitle({ boardId, boardTitle: newTitle }));
			setNewTitle(title);
			setIsTitleOnEditMode(false);
		}
		if (newTitle === title) {
			setIsTitleOnEditMode(false);
		} else {
			setNewTitle(title);
			setIsTitleOnEditMode(false);
		}
	};

	if (isTitleOnEditMode) {
		return (
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleEditBoardTitle();
				}}
			>
				<input
					className='nav-title__input'
					ref={inputRef}
					type='text'
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					onBlur={handleEditBoardTitle}
				/>
			</form>
		);
	} else {
		return <>{title}</>;
	}
};

export default NavTitle;
