import React, { useState, useRef, useEffect } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import useOnClickOutside from '../../../utils/useClickOutside';
import {
	deleteListBoard,
	editListTitle,
} from '../../../features/board/kanbanSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';

type ListHeaderPropsType = {
	title: string;
	listId: number;
};

const ListHeader = ({ title, listId }: ListHeaderPropsType) => {
	const dispatch = useAppDispatch();

	const { boardId } = useParams();

	const [isEditing, setIsEditing] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	const [newTitle, setNewTitle] = useState('');
	const deleteListRef = useRef<null | HTMLDivElement>(null);
	const titleRef = useRef<null | HTMLTextAreaElement>(null);
	useOnClickOutside(deleteListRef, () => setShowDelete(false));
	useOnClickOutside(titleRef, () => handler());

	useEffect(() => {
		if (isEditing) {
			if (titleRef && titleRef.current) {
				titleRef.current.focus();
				titleRef.current.select();
				setNewTitle(title);
			}
		}
	}, [isEditing, title]);

	const handler = () => {
		if (newTitle === title || !newTitle) {
		} else {
			dispatch(editListTitle({ boardId, title: newTitle, listId }));
		}
		setIsEditing(false);
	};

	return (
		<div className='list-header list-header-edit'>
			{!isEditing ? (
				<div className='list-header-title' onClick={() => setIsEditing(true)}>
					{title}
				</div>
			) : (
				<textarea
					ref={titleRef}
					className='list-header-textarea'
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
				></textarea>
			)}

			<div
				className='list-header-cta'
				onClick={() => {
					setShowDelete(true);
				}}
			>
				<MdMoreHoriz />
			</div>
			<div
				className={`delete-list-modal ${showDelete && 'active'}`}
				ref={deleteListRef}
			>
				<h4>Delete this list ?</h4>
				<div className='separator'></div>
				<small>This action is irreversible!</small>

				<button
					onClick={() => {
						dispatch(deleteListBoard(listId));
						setShowDelete(false);
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default ListHeader;
