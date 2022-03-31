import React, { useState, useRef } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import useOnClickOutside from '../../../utils/useClickOutside';
import { deleteListBoard } from '../../../features/board/kanbanSlice';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';

type ListHeaderPropsType = {
	title: string;
	listId: number;
};

const ListHeader = ({ title, listId }: ListHeaderPropsType) => {
	const dispatch = useAppDispatch();

	const [isEditing, setIsEditing] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	const deleteListRef = useRef<null | HTMLDivElement>(null);
	useOnClickOutside(deleteListRef, () => setShowDelete(false));

	return (
		<div className='list-header list-header-edit'>
			<div className='list-header-title'>{title}</div>
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
				<h5>Delete this list ?</h5>
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
