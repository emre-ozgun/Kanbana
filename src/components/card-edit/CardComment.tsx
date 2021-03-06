import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineModeComment, MdClose } from 'react-icons/md';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
	addCardComment,
	deleteCardComment,
} from '../../features/cardEdit/cardSlice';
import {
	addBoardCardComment,
	deleteBoardCardComment,
} from '../../features/board/kanbanSlice';
import { selectAuth } from '../../features/auth/authSlice';
import bannerUtil from '../../utils/userBannerGenerator';
import useOnClickOutside from '../../utils/useClickOutside';
import Moment from 'react-moment';

type CardDescriptionPropsType = {
	comments: any[];
	listId: string | undefined;
	cardId: number;
};

const CardComment = ({
	comments,
	listId,
	cardId,
}: CardDescriptionPropsType) => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(selectAuth);

	const [commentOpen, setCommentOpen] = useState(false);

	const [comment, setComment] = useState('');
	const [disabled, setDisabled] = useState(false);

	const commentBoxRef = useRef<null | HTMLTextAreaElement>(null);

	useOnClickOutside(commentBoxRef, () => handler());

	useEffect(() => {
		if (!comment) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [comment]);

	const handler = () => {
		if (!comment) {
			setCommentOpen(false);
		} else {
			console.log(comment);
			dispatch(addCardComment({ cardId, comment }));
			dispatch(addBoardCardComment({ listId, cardId }));
			setComment('');
			setCommentOpen(false);
		}
	};

	const handleDeleteComment = (commentId: number) => {
		dispatch(deleteCardComment(commentId));
		dispatch(deleteBoardCardComment({ listId, cardId }));
	};

	const sortedComments = React.useMemo(() => {
		return [...comments].sort(
			(a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
		);
	}, [comments]);

	return (
		<>
			<section className='single-card__title'>
				<div className='single-card__title-icon'>
					<MdOutlineModeComment />
				</div>

				<div className='single-card__title-text'>
					<h4>Comments</h4>
				</div>
			</section>
			<section className='single-card__comment'>
				<div
					style={{
						backgroundColor: `${bannerUtil.generateBanner(
							`${user?.username.slice(0, 1)}`
						)}`,
						color: `${bannerUtil.adjustContrast(
							`${bannerUtil.generateBanner(`${user?.username.slice(0, 1)}`)}`
						)}`,
					}}
					className='single-card__comment-banner'
				>
					{user?.username.slice(0, 1).toUpperCase()}
				</div>

				<div
					className='single-card__comment-add'
					onClick={() => setCommentOpen(true)}
				>
					<textarea
						ref={commentBoxRef}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder='Write a comment...'
					></textarea>
					<div className={`comment-save ${commentOpen && 'active'}`}>
						<button
							className='c-btn-save'
							disabled={disabled}
							onClick={handler}
						>
							Save
						</button>
					</div>
				</div>
			</section>
			{sortedComments &&
				sortedComments.length > 0 &&
				sortedComments.map((comment: any) => {
					return (
						<section className='single-card__comment' key={comment.id}>
							<div
								style={{
									backgroundColor: `${bannerUtil.generateBanner(
										`${comment.author.username.slice(0, 1)}`
									)}`,
									color: `${bannerUtil.adjustContrast(
										`${bannerUtil.generateBanner(
											`${comment.author.username.slice(0, 1)}`
										)}`
									)}`,
								}}
								className='single-card__comment-banner'
							>
								{comment.author.username.slice(0, 1).toUpperCase()}
							</div>

							<div className='comment-wrapper'>
								<div className='comment-header'>
									<h4>{comment.author.username}</h4>
									<small>
										<Moment interval={30000} fromNow>
											{comment.createdAt}
										</Moment>
									</small>
								</div>
								<div className='comment-readonly'>{comment.message}</div>
								<small
									className='comment-delete-btn'
									onClick={() => handleDeleteComment(comment.id)}
								>
									Delete
								</small>
							</div>
						</section>
					);
				})}
		</>
	);
};

export default CardComment;
