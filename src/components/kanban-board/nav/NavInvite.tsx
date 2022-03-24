import React from 'react';

type NavInviteProps = {
	isInviteOpen: boolean;
	setIsInviteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavInvite = ({ isInviteOpen, setIsInviteOpen }: NavInviteProps) => {
	return <div>NavInvite</div>;
};

export default NavInvite;
