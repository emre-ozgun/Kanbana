import React from 'react';
import { MdOutlineCheckBox } from 'react-icons/md';

type ChecklistPropsType = {
	checklists: any[];
};

const Checklist = ({ checklists }: ChecklistPropsType) => {
	let count = 0;
	let completed = 0;

	console.log(checklists);

	checklists.forEach((checklist: any) => {
		checklist.items.forEach((item: any) => {
			count++;
			if (item.isChecked) {
				completed++;
			}
		});
	});

	return (
		<div className='badge'>
			<span
				className={`badge-icon ${count === completed && 'badge-is-complete'}`}
			>
				<div className='badge-icon-text'>
					<MdOutlineCheckBox />
					<span className='badge-text'>
						{completed}/{count}
					</span>
				</div>
			</span>
		</div>
	);
};

export default Checklist;
