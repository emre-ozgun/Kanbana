import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
	getUsers,
	selectUsers,
} from '../../../features/userList/userListSlice';
import useOnClickOutside from '../../../utils/useClickOutside';
import { BoardMember } from '../../../features/board/kanbanSlice';
import Spinner from '../../spinner/Spinner';
import bannerUtil from '../../../utils/userBannerGenerator';
import { useParams } from 'react-router-dom';
import { inviteMembersToBoard } from '../../../features/board/kanbanSlice';
import './NavInvite.css';

type NavInviteProps = {
	isInviteOpen: boolean;
	setIsInviteOpen: React.Dispatch<React.SetStateAction<boolean>>;
	ownerId: number;
	members: BoardMember[];
};

const NavInvite = ({
	isInviteOpen,
	setIsInviteOpen,
	ownerId,
	members,
}: NavInviteProps) => {
	const { boardId } = useParams();
	const dispatch = useAppDispatch();

	const inviteRef = useRef<null | HTMLDivElement>(null);

	useOnClickOutside(inviteRef, () => setIsInviteOpen(false));

	const { userList, isLoading } = useAppSelector(selectUsers);

	const [membersToBeInvited, setMembersToBeInvited] = useState<any[]>([]);

	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		if (isInviteOpen) {
			dispatch(getUsers());
		}
	}, [isInviteOpen, dispatch]);

	useEffect(() => {
		if (userList.length) {
			const alreadyMembers = members.map((m) => m.username);

			const invitableUsers = userList
				.filter((user: any) => user.id !== ownerId)
				.filter((user: any) => !alreadyMembers.includes(user.username))
				.map((user: any) => ({ ...user, checked: false }));

			setMembersToBeInvited(invitableUsers);
		}
	}, [userList]);

	useEffect(() => {
		const isAllUnchecked = membersToBeInvited.every(
			(m: any) => m.checked === false
		);

		if (isAllUnchecked) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [membersToBeInvited]);

	const handleChange = (id: number) => {
		const newMember = membersToBeInvited.find((m: any) => m.id === id);
		newMember.checked = !newMember.checked;

		const adjustedMembers = membersToBeInvited.map((member: any) => {
			if (member.id === id) {
				return newMember;
			} else {
				return member;
			}
		});

		setMembersToBeInvited(adjustedMembers);
	};

	const handleInviteMember = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const toBeInvited = membersToBeInvited
			.filter((m: any) => m.checked)
			.map((m: any) => ({ boardMemberId: m.id, username: m.username }));

		dispatch(inviteMembersToBoard({ boardId, payload: toBeInvited }));

		setIsInviteOpen(false);
	};

	return (
		<div className={`nav-invite ${isInviteOpen && 'active'}`} ref={inviteRef}>
			<h5>Invite users to your board...</h5>

			{isLoading ? (
				<div className='invite-loading'>
					<Spinner />
				</div>
			) : membersToBeInvited.length > 0 ? (
				<form
					className='nav-invite__form'
					onSubmit={(e) => handleInviteMember(e)}
				>
					{membersToBeInvited.map((member: any) => (
						<label key={member.id}>
							<div className='nav-invite__form-title'>
								<div
									className='nav-invite__form-banner'
									style={{
										backgroundColor: `${bannerUtil.generateBanner(
											`${member.username.slice(0, 1)}`
										)}`,
										color: `${bannerUtil.adjustContrast(
											`${bannerUtil.generateBanner(
												`${member.username.slice(0, 1)}`
											)}`
										)}`,
									}}
								>
									{member.username.slice(0, 1)}
								</div>
								<div className='nav-invite__form-username'>
									{member.username}
								</div>
							</div>

							<input
								type='checkbox'
								checked={member.checked}
								onChange={() => {
									handleChange(member.id);
								}}
							/>
						</label>
					))}
					<button disabled={disabled}>Invite</button>
				</form>
			) : (
				<small>No available users to invite...</small>
			)}
		</div>
	);
};

export default React.memo(NavInvite);
