import './Board.css';

type ListType = {
	lists: any[];
};

const Board = ({ lists }: ListType) => {
	console.log(lists);

	return (
		<main className='board'>
			<div className='board-wrapper'>
				<div className='list-container'>
					<div className='list-header'>list 1</div>
					<div className='card-container'>
						<div className='card'>card 1</div>
						<div className='card'>card 2</div>
						<div className='card'>card 3</div>
						<div className='card'>card 4</div>
						<div className='card'>card 5</div>
						<div className='card'>card 6</div>
						<div className='card'>card 7</div>
						<div className='card'>card 8</div>
					</div>
				</div>
				<div className='list-container'>
					<div className='list-header'>list 1</div>
					<div className='card-container'>
						<div className='card'>card 1</div>
						<div className='card'>card 2</div>
						<div className='card'>card 3</div>
						<div className='card'>card 4</div>
						<div className='card'>card 5</div>
						<div className='card'>card 6</div>
						<div className='card'>card 7</div>
						<div className='card'>card 8</div>
					</div>
				</div>
				<div className='list-container'>
					<div className='list-header'>list 1</div>
					<div className='card-container'>
						<div className='card'>card 1</div>
						<div className='card'>card 2</div>
						<div className='card'>card 3</div>
						<div className='card'>card 4</div>
					</div>
				</div>
				<div className='list-composer'>+ Add new list</div>
			</div>
		</main>
	);
};

export default Board;
