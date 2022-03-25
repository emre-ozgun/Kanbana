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
	const [newTitle, setNewTitle] = useState(title);
	const inputRef = useRef<null | HTMLInputElement>(null);

	useEffect(() => {
		if (isTitleOnEditMode) {
			inputRef?.current?.focus();
		}
	}, [isTitleOnEditMode]);

	const handleEditBoardTitle = () => {
		if (!newTitle) {
			setNewTitle(title);
			setIsTitleOnEditMode(false);
		} else {
			dispatch(editBoardTitle({ boardId, boardTitle: newTitle }));

			setIsTitleOnEditMode(false);
		}
	};

	if (isTitleOnEditMode) {
		return (
			<input
				className='nav-title__input'
				ref={inputRef}
				type='text'
				value={newTitle || title}
				onChange={(e) => setNewTitle(e.target.value)}
				onBlur={handleEditBoardTitle}
			/>
		);
	} else {
		return <>{title}</>;
	}
};

export default NavTitle;
