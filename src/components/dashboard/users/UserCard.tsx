/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TabDataWrapper, TabNavigate, TabPanel } from 'components/dashboard/helpers/helpers';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import {
    getUserProfile,
    getUserExtendedInfo,
    getUserShortInfo,
    getUserLocations,
    getUserPermissions,
    getUserSettings,
    listUserSessions,
    listUserLogins,
    listSubusers,
    listSalesPersons,
    getAllUIPermissions,
    getAllUITypes,
    setUserPermissions,
} from 'services/user.service';

enum UserCardTabs {
    Profile = 'Profile',
    ExtendedInfo = 'Extended info',
    ShortInfo = 'Short info',
    Locations = 'Locations',
    UserPermissions = 'User permissions',
    Settings = 'Settings',
    Sessions = 'Sessions',
    Logins = 'Logins',
    Subusers = 'Subusers',
    SalesPersons = 'Sales persons',
    Permissions = 'Permissions',
    UserTypes = 'User types',
}

const userCardTabsArray: string[] = Object.values(UserCardTabs) as string[];

export function UserCard() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Profile');
    const [profileJson, setProfileJson] = useState<string>('');
    const [extendedInfoJSON, setExtendedInfoJSON] = useState<string>('');
    const [shortInfoJSON, setShortInfoJSON] = useState<string>('');
    const [locationsJSON, setLocationsJSON] = useState<string>('');
    const [userPermissionsJSON, setUserPermissionsJSON] = useState<string>('');
    const [userSettingsJSON, setUserSettingsJSON] = useState<string>('');
    const [userSessionsJSON, setUserSessionsJSON] = useState<string>('');
    const [userLoginsJSON, setUserLoginsJSON] = useState<string>('');
    const [userSubusersJSON, setUserSubusersJSON] = useState<string>('');
    const [userSalesPersonsJSON, setSalesPersonsJSON] = useState<string>('');
    const [permissionsJSON, setPermissionsJSON] = useState<string>('');
    const [userTypesJSON, setUserTypesJSON] = useState<string>('');

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [buttonPermissionsText, setButtonPermissionsText] = useState<string>('Save permissions');
    const [initialUserPermissionsJSON, setInitialUserPermissionsJSON] = useState<string>('');

    useEffect(() => {
        if (id) {
            getUserProfile(id).then((response) => {
                setProfileJson(JSON.stringify(response, null, 2));
            });
            getUserExtendedInfo(id).then((response) => {
                setExtendedInfoJSON(JSON.stringify(response, null, 2));
            });
            getUserShortInfo(id).then((response) => {
                setShortInfoJSON(JSON.stringify(response, null, 2));
            });
            getUserLocations(id).then((response) => {
                setLocationsJSON(JSON.stringify(response, null, 2));
            });
            getUserPermissions(id).then((response) => {
                const stringifiedResponse = JSON.stringify(response, null, 2);
                setUserPermissionsJSON(stringifiedResponse);
                setInitialUserPermissionsJSON(stringifiedResponse);
            });
            getUserSettings(id).then((response) => {
                setUserSettingsJSON(JSON.stringify(response, null, 2));
            });
            listUserSessions(id).then((response) => {
                setUserSessionsJSON(JSON.stringify(response, null, 2));
            });
            listUserLogins(id).then((response) => {
                setUserLoginsJSON(JSON.stringify(response, null, 2));
            });
            listSubusers(id).then((response) => {
                setUserSubusersJSON(JSON.stringify(response, null, 2));
            });
            listSalesPersons(id).then((response) => {
                setSalesPersonsJSON(JSON.stringify(response, null, 2));
            });
            getAllUIPermissions(id).then((response) => {
                setPermissionsJSON(JSON.stringify(response, null, 2));
            });
            getAllUITypes(id).then((response) => {
                setUserTypesJSON(JSON.stringify(response, null, 2));
            });
        }
    }, [id]);

    const mutateJson = (jsonString: string, fieldName: string): string => {
        try {
            const jsonObject = JSON.parse(jsonString);

            if (typeof jsonObject === 'object' && jsonObject !== null) {
                const fieldValue = jsonObject[fieldName];
                delete jsonObject[fieldName];

                const updatedJsonObject = { [fieldName]: fieldValue, ...jsonObject };
                return JSON.stringify(updatedJsonObject, null, 2);
            }
        } catch (err) {}

        return jsonString;
    };

    useEffect(() => {
        if (initialUserPermissionsJSON !== userPermissionsJSON) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [userPermissionsJSON, initialUserPermissionsJSON]);

    const handleChangeUserPermissions = ([fieldName, fieldValue]: [string, number]): void => {
        const parsedUserPermission = JSON.parse(userPermissionsJSON);
        parsedUserPermission[fieldName] = fieldValue;
        setUserPermissionsJSON(JSON.stringify(parsedUserPermission, null, 2));
    };

    const handleSetUserPermissions = (): void => {
        if (id) {
            setUserPermissions(id, JSON.parse(userPermissionsJSON)).then((response) => {
                try {
                    setButtonPermissionsText('Success!');
                    setIsButtonDisabled(true);
                    setInitialUserPermissionsJSON(userPermissionsJSON);
                    setButtonPermissionsText('Save permissions');
                } catch (error) {
                    setButtonPermissionsText('Error!');
                    setIsButtonDisabled(true);
                    setButtonPermissionsText('Save permissions');
                }
            });
        }
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
            <div className='col-12'>
                <div className='card card-custom mb-5 vw-90 mx-auto'>
                    <div className='card-header'>
                        <h3 className='card-title fw-bolder text-dark'>User Card</h3>
                    </div>
                    <div className='card-body d-flex flex-column justify-content-end pb-0'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            {userCardTabsArray.map((tab) => (
                                <TabNavigate
                                    key={tab}
                                    tab={tab}
                                    activeTab={activeTab}
                                    onTabClick={handleTabClick}
                                />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='tab-content' id='myTabPanel'>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.Profile}>
                        <TabDataWrapper data={profileJson} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.ExtendedInfo}>
                        <TabDataWrapper data={extendedInfoJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.ShortInfo}>
                        <TabDataWrapper data={shortInfoJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.Locations}>
                        <TabDataWrapper data={locationsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.UserPermissions}>
                        <TabDataWrapper
                            data={mutateJson(userPermissionsJSON, 'useruid')}
                            checkbox={true}
                            action={handleChangeUserPermissions}
                        >
                            <PrimaryButton
                                buttonText={buttonPermissionsText}
                                icon='check'
                                disabled={isButtonDisabled}
                                buttonClickAction={handleSetUserPermissions}
                            />
                        </TabDataWrapper>
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.Settings}>
                        <TabDataWrapper data={userSettingsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.Sessions}>
                        <TabDataWrapper data={userSessionsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.Logins}>
                        <TabDataWrapper data={userLoginsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.Subusers}>
                        <TabDataWrapper data={userSubusersJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.SalesPersons}>
                        <TabDataWrapper data={userSalesPersonsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.Permissions}>
                        <TabDataWrapper data={permissionsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.UserTypes}>
                        <TabDataWrapper data={userTypesJSON} />
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
