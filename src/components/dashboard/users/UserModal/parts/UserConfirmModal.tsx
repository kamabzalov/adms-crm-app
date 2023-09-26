import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';

interface UserConfirmModalProps {
    onClose: () => void;
    onConfirm: () => void;
    username: string;
}

export const UserConfirmModal = ({
    onClose,
    onConfirm,
    username,
}: UserConfirmModalProps): JSX.Element => {
    return (
        <>
            <div className='fv-row mb-8 fs-4'>
                You want to delete user?
                <div className='my-4'>
                    <b>{username}</b>
                </div>
            </div>
            <div className='modal-footer d-flex justify-content-around pb-0'>
                <PrimaryButton buttonText='Cancel' type='warning' buttonClickAction={onClose} />
                <PrimaryButton buttonText='Delete' buttonClickAction={onConfirm} />
            </div>
        </>
    );
};
