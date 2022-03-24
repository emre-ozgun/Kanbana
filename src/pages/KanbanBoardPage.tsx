import KanbanNav from '../components/kanban-board/nav/Navbar';
import KanbanBoard from '../components/kanban-board/board/Board';
import { useParams } from 'react-router-dom';

const KanbanBoardPage = () => {
	const params = useParams();

	console.log(params);
	return (
		<>
			<KanbanNav />
			<KanbanBoard />
		</>
	);
};

export default KanbanBoardPage;
