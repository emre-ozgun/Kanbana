import { useEffect } from 'react';
import KanbanNav from '../components/kanban-board/nav/Navbar';
import KanbanBoard from '../components/kanban-board/board/Board';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getBoard, selectBoard } from '../features/board/kanbanSlice';

const KanbanBoardPage = () => {
	const { boardId } = useParams();
	const dispatch = useAppDispatch();
	const { board, isError, isLoading, isSuccess } = useAppSelector(selectBoard);

	useEffect(() => {
		dispatch(getBoard(boardId));
	}, [dispatch, boardId]);

	console.log(board, isSuccess);

	return (
		<>
			<KanbanNav
				navFields={{
					id: board.id,
					title: board.title,
					ownerId: board.ownerId,
					members: board.members,
				}}
			/>
			<KanbanBoard />
		</>
	);
};

export default KanbanBoardPage;
