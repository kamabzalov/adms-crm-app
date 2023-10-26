import { useEffect, useState } from 'react';
import { renderList } from 'components/dashboard/helpers/helpers';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { Status, getUserPermissions, setUserPermissions } from 'services/user.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';
import { UserPermissionsRecord } from 'common/interfaces/UserData';

interface UserPermissionsModalProps {
    onClose: () => void;
    useruid: string;
    username: string;
    onUpdateUsers: () => void;
}

const sortPermissionsKeys: ReadonlyArray<string> = ['Contacts', 'Deal'];

const sortPermissions = (permissions: UserPermissionsRecord) => {
    const contactPermissions: UserPermissionsRecord = {};
    const dealsPermissions: UserPermissionsRecord = {};
    const otherPermissions: UserPermissionsRecord = {};
    const [contacts, deals] = sortPermissionsKeys;

    for (const key in permissions) {
        if (permissions.hasOwnProperty(key)) {
            const value = permissions[key];
            if (key.includes(contacts)) {
                contactPermissions[key] = value;
            } else if (key.includes(deals)) {
                dealsPermissions[key] = value;
            } else {
                otherPermissions[key] = value;
            }
        }
    }

    return {
        ...contactPermissions,
        ...dealsPermissions,
        ...otherPermissions,
    };
};

export const UserPermissionsModal = ({
    onClose,
    useruid,
    username,
    onUpdateUsers,
}: UserPermissionsModalProps): JSX.Element => {
    const [userPermissionsJSON, setUserPermissionsJSON] = useState<string>('');
    const [initialUserPermissionsJSON, setInitialUserPermissionsJSON] = useState<string>('');
    const [modifiedJSON, setModifiedJSON] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const { handleShowToast } = useToast();

    const filterObjectValues = (json: UserPermissionsRecord) => {
        const filteredObj: any = {};
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                const value = json[key];
                if (value === 0 || value === 1) {
                    filteredObj[key] = value;
                }
            }
        }

        return filteredObj;
    };

    useEffect(() => {
        setIsLoading(true);
        if (useruid) {
            getUserPermissions(useruid).then(async (response) => {
                const sortedPermissions = sortPermissions(response);
                const stringifiedResponse = JSON.stringify(sortedPermissions, null, 2);
                setUserPermissionsJSON(stringifiedResponse);
                setInitialUserPermissionsJSON(stringifiedResponse);
                const filteredData = filterObjectValues(sortedPermissions);
                setModifiedJSON(filteredData);
                setIsLoading(false);
            });
        }
    }, [useruid]);

    useEffect(() => {
        if (initialUserPermissionsJSON !== userPermissionsJSON && !isLoading) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [userPermissionsJSON, initialUserPermissionsJSON, isLoading]);

    const handleChangeUserPermissions = ([fieldName, fieldValue]: [string, number]): void => {
        const parsedUserPermission = JSON.parse(userPermissionsJSON);
        parsedUserPermission[fieldName] = fieldValue;
        setUserPermissionsJSON(JSON.stringify(parsedUserPermission, null, 2));
        setModifiedJSON(filterObjectValues(parsedUserPermission));
    };

    const handleSetUserPermissions = async (): Promise<void> => {
        try {
            if (useruid) {
                const response = await setUserPermissions(useruid, JSON.parse(userPermissionsJSON));
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${username}</strong> permissions successfully saved`,
                        type: 'success',
                    });
                    onClose();
                    onUpdateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isLoading && (
                <>
                    {renderList({
                        data: modifiedJSON,
                        checkbox: true,
                        action: handleChangeUserPermissions,
                    })}
                </>
            )}
            <PrimaryButton
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserPermissions}
            >
                Save permissions
            </PrimaryButton>
        </>
    );
};
