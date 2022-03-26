import { useEffect } from 'react';
import KanbanNav from '../components/kanban-board/nav/Navbar';
import KanbanBoard from '../components/kanban-board/board/Board';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getBoard, selectBoard } from '../features/board/kanbanSlice';

const KanbanBoardPage = () => {
	const { boardId } = useParams();
	const dispatch = useAppDispatch();
	const { board } = useAppSelector(selectBoard);

	// change page title and fetch board
	useEffect(() => {
		dispatch(getBoard(boardId));
		document.title = `${board.title} | Kanbana`;
	}, [dispatch, boardId, board.title]);

	// disable page scroll
	useEffect(() => {
		document.body.classList.add('lock-screen');

		return function cleanup() {
			document.body.classList.remove('lock-screen');
		};
	}, []);

	console.log(board.lists);

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
			<KanbanBoard lists={board.lists} />
		</>
	);
};

export default KanbanBoardPage;
