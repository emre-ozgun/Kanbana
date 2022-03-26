import ListComposer from './ListComposer';
import CardComposer from './CardComposer';

import './Board.css';

type ListType = {
	lists: any[];
};

const Board = ({ lists }: ListType) => {
	console.log(lists);

	return (
		<main className='board'>
			<div className='list-wrapper'>
				<div className='list-content'>
					<div className='list-header'>list 1</div>
					<div className='card-container'>
						<div className='card'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
							iusto eligendi accusantium natus recusandae blanditiis provident
							nesciunt quod doloremque amet voluptates dolor, corrupti iste
							optio unde placeat error! Tempora, corrupti.
						</div>
						<div className='card'>card 2</div>
						<div className='card'>card 3</div>
						<div className='card'>card 4</div>
						<div className='card'>card 5</div>
						<div className='card'>card 6</div>
						<div className='card'>card 7</div>
						<div className='card'>card 8</div>
					</div>
					<CardComposer />
				</div>
			</div>
			<div className='list-wrapper'>
				<div className='list-content'>
					<div className='list-header'>list 1</div>

					<CardComposer />
				</div>
			</div>

			<div className='list-wrapper'>
				<div className='list-content'>
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
					<CardComposer />
				</div>
			</div>
			<div className='list-wrapper'>
				<div className='list-content'>
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
						<div className='card'>card 1</div>
						<div className='card'>card 2</div>
						<div className='card'>card 3</div>
						<div className='card'>card 4</div>
						<div className='card'>card 5</div>
						<div className='card'>card 6</div>
						<div className='card'>card 7</div>
						<div className='card'>card 3</div>
						<div className='card'>card 4</div>
						<div className='card'>card 5</div>
						<div className='card'>card 6</div>
						<div className='card'>card 7</div>
					</div>
					<CardComposer />
				</div>
			</div>

			<div className='list-wrapper'>
				<ListComposer />
			</div>
		</main>
	);
};

export default Board;
