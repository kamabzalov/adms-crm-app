import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { convertToNumberIfNumeric, deepEqual } from 'components/dashboard/helpers/common';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { Status, getUserSettings, setUserSettings } from 'services/user.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';

interface UserSettingsModalProps {
    onClose: () => void;
    useruid: string;
    username: string;
}

export const UserSettingsModal = ({
    onClose,
    useruid,
    username,
}: UserSettingsModalProps): JSX.Element => {
    const [settings, setSettings] = useState<any>({});
    const [initialUserSettings, setInitialUserSettings] = useState<any>({});
    const [allSettings, setAllSettings] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const { handleShowToast } = useToast();

    useEffect(() => {
        setIsLoading(true);
        if (useruid) {
            getUserSettings(useruid).then(async (response) => {
                setAllSettings(response);
                const responseSettings = response.settings;
                setSettings(responseSettings);
                setInitialUserSettings(responseSettings);
                setIsLoading(false);
            });
        }
    }, [useruid]);

    useEffect(() => {
        const isEqual = deepEqual(initialUserSettings, settings);
        if (!isEqual && !isLoading) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [settings, initialUserSettings, isLoading]);

    const handleChangeUserSettings = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;

            setSettings({
                ...settings,
                [name]: convertToNumberIfNumeric(value),
            });
        },
        [settings]
    );

    const handleSetUserSettings = async (): Promise<void> => {
        setIsLoading(true);
        try {
            if (useruid) {
                const newSettings = { ...allSettings, settings };
                const response = await setUserSettings(useruid, newSettings);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${username}</strong> settings successfully saved`,
                        type: 'success',
                    });
                    onClose();
                }
            }
        } catch (error) {
            const { message } = error as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!settings) {
        return <></>;
    }

    const disabledKeys = ['useruid', 'created', 'updated'];
    return (
        <>
            {settings &&
                Object.entries(settings).map(([setting, value]: any) => {
                    return (
                        <div className='fv-row mb-8' key={setting}>
                            <label
                                htmlFor={setting}
                                className='form-label fs-6 fw-bolder text-dark'
                            >
                                {setting}
                            </label>
                            <input
                                disabled={disabledKeys.includes(setting)}
                                className='form-control bg-transparent'
                                name={setting}
                                type={'text'}
                                value={value}
                                onChange={handleChangeUserSettings}
                            />
                        </div>
                    );
                })}
            <PrimaryButton
                buttonText='Save permissions'
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserSettings}
            />
        </>
    );
};
