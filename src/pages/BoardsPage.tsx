import { useEffect, useState } from 'react';
import Header from '../components/board-list/header/Header';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
	selectBoardList,
	getBoardList,
} from '../features/boardList/boardSlice';
import CreatedBoards from '../components/board-list/created-boards/CreatedBoards';
import AddNewBoard from '../components/board-list/created-boards/AddNewBoard';
import MemberBoards from '../components/board-list/member-boards/MemberBoards';
import { FaUser, FaUsers } from 'react-icons/fa';

const BoardsPage = () => {
	const dispatch = useAppDispatch();
	const { boards, isError, isLoading, message, isSuccess } =
		useAppSelector(selectBoardList);

	const [showAddBoardField, setShowAddBoardField] = useState(false);

	useEffect(() => {
		document.title = 'Boards | Kanbana';
		dispatch(getBoardList());
	}, [dispatch]);

	return (
		<>
			<Header />
			{/* <CreatedBoardsTitle/> */}
			<section className='section board-list'>
				<div className='board-list-title'>
					<div className='board-list-title__wrapper'>
						<FaUser />
						<h3>Your Boards</h3>
					</div>
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

				{isError && (
					<div className='board-list-error'>
						<h5>{message}</h5>
					</div>
				)}

				{/* {isLoading && (
					<div className='board-list-spinner'>
						<Spinner />
					</div>
				)} */}

				{/* {!isError && isSuccess && !isLoading && (
					<CreatedBoards
						boards={boards.ownedBoards.length ? boards.ownedBoards : []}
					/>
				)} */}
				{!isError && isSuccess && !isLoading && (
					<CreatedBoards
						boards={boards.ownedBoards.length ? boards.ownedBoards : []}
					/>
				)}

				{isLoading && (
					<CreatedBoards
						boards={boards.ownedBoards.length ? boards.ownedBoards : []}
					/>
				)}
			</section>
			<section className='section board-list'>
				<div className='board-list-title'>
					<div className='board-list-title__wrapper'>
						<FaUsers />
						<h3>Boards you participate in</h3>
					</div>
				</div>
				{!isError && isSuccess && !isLoading && (
					<MemberBoards
						boards={boards.memberBoards.length ? boards.memberBoards : []}
					/>
				)}
			</section>
		</>
	);
};

export default BoardsPage;
