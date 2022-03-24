import { FaTrello, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';

const KanbanNavbar = () => {
	return (
		<header className='kanban-header'>
			<nav className='kanban-nav'>
				<div className='nav-wrapper'>
					<div className='nav-item'>
						<Link to='/boards' className='nav-boards'>
							<FaTrello />
							Boards
						</Link>
					</div>
					<div className='nav-item'>
						{/* <BoardTitle/> */}
						{/* Development Board */}
					</div>
				</div>
				<div className='nav-wrapper'>Development Board</div>

				<div className='nav-wrapper'>
					<div className='nav-item'>
						<button>Members</button>
						{/* <BoardMembers/> */}
					</div>
					<div className='nav-item'>
						<button>+ Invite</button>
						{/* <AddMember/> */}
					</div>

					<div className='nav-item'>
						<button className='nav-item__user'>E</button>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default KanbanNavbar;
