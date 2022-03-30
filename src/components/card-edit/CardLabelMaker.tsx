import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineLabel } from 'react-icons/md';
import { useAppDispatch } from '../../hooks';
import {
	addCardLabel,
	removeCardLabel,
} from '../../features/cardEdit/cardSlice';
import {
	addBoardCardLabel,
	removeBoardCardLabel,
} from '../../features/board/kanbanSlice';
import useOnClickOutside from '../../utils/useClickOutside';

type CardLabelMakerPropsType = {
	labels: any[];
	cardId: number;
	listId: string | undefined;
};

const availableLabels = [
	{ id: 1, title: 'Urgent', color: 'red', isChecked: false },
	{ id: 2, title: 'Idle', color: 'grey', isChecked: false },
];

const CardLabelMaker = ({
	labels,
	cardId,
	listId,
}: CardLabelMakerPropsType) => {
	const dispatch = useAppDispatch();
	const [showLabelMaker, setShowLabelMaker] = useState(false);
	const labelRef = useRef<null | HTMLDivElement>(null);

	const [checkboxLabels, setCheckboxLabels] = useState<any[]>([]);

	useOnClickOutside(labelRef, () => setShowLabelMaker(false));

	const doesLabelExist = React.useCallback(
		(id: number) => {
			let flag = false;
			for (let label of labels) {
				if (label.id === id) {
					flag = true;
				}
			}
			return flag;
		},
		[labels]
	);

	useEffect(() => {
		const labelsInitial = availableLabels.map((label: any) => {
			return {
				id: label.id,
				title: label.title,
				color: label.color,
				isChecked: doesLabelExist(label.id),
			};
		});

		setCheckboxLabels(labelsInitial);
	}, [cardId, doesLabelExist]);

	const handleLabelChange = (id: number) => {
		const labelToBeChanged = checkboxLabels.find((c: any) => c.id === id);
		labelToBeChanged.isChecked = !labelToBeChanged.isChecked;

		if (labelToBeChanged.isChecked) {
			dispatch(addCardLabel({ cardId, labelId: id }));
			dispatch(
				addBoardCardLabel({
					listId,
					cardId,
					labelId: id,
					color: labelToBeChanged.color,
				})
			);
		} else {
			const labelToBeRemoved = labels.find((l: any) => l.id === id);
			const cardLabelId = labelToBeRemoved.CardLabel.id;
			dispatch(removeCardLabel({ cardLabelId, labelId: id }));
			dispatch(removeBoardCardLabel({ listId, cardId, labelId: id }));
		}

		const newCheckboxLabels = checkboxLabels.map((c: any) => {
			if (c.id === id) {
				return labelToBeChanged;
			} else {
				return c;
			}
		});

		setCheckboxLabels(newCheckboxLabels);
	};

	return (
		<>
			<div
				className='sidebar-link label-link'
				onClick={() => {
					setShowLabelMaker(true);
				}}
			>
				<MdOutlineLabel />

				<span>Labels</span>
				<div
					className={`label-maker ${showLabelMaker && 'active'}`}
					ref={labelRef}
				>
					<h3>Labels</h3>
					<div className='separator'></div>
					<div className='label-maker-list'>
						{checkboxLabels.length > 0 &&
							checkboxLabels.map((checkbox: any) => {
								return (
									<label key={checkbox.id}>
										<div
											className='label-checklist-urgent'
											style={{ backgroundColor: `${checkbox.color}` }}
										>
											{checkbox.title}
										</div>

										<input
											type='checkbox'
											checked={checkbox.isChecked}
											onChange={() => handleLabelChange(checkbox.id)}
										/>
									</label>
								);
							})}
					</div>
				</div>
			</div>
		</>
	);
};

export default CardLabelMaker;
