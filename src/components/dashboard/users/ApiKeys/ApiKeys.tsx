/* eslint-disable react-hooks/exhaustive-deps */
import { ApiKeyRecord, ApiTypeName } from 'common/interfaces/UserApiKeys';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { useState, useEffect, useMemo } from 'react';
import { useTable, ColumnInstance, Row } from 'react-table';
import { ApiKeyModal } from './ApiKeysModal/ApiKeyModal';
import { ApiKeysColumns } from './ApiKeysTable/ApiKeysColumns';
import { ApiKeysHeaderColumn } from './ApiKeysTable/ApiKeysHeaderColumn';
import { ApiKeysRow } from './ApiKeysTable/ApiKeysRow';
import { getUserApiKeysList } from './apiKeys.service';

const defaultDate = new Date().getTime();

const initialApiKeysState: ApiKeyRecord[] = [
    {
        created: '',
        deleted: '',
        updated: '',
        issuedate: defaultDate,
        expirationdate: defaultDate,
        lastused: '',
        flags: 0,
        enabled: 0,
        apitype: ApiTypeName.DEFAULT,
        useruid: '',
        itemuid: '',
        apikey: '',
        notes: '',
        id: 0,
    },
];

export const ApiKeys = ({ useruid }: { useruid: string }): JSX.Element => {
    const [apiKeys, setApiKeys] = useState<ApiKeyRecord[]>(initialApiKeysState);
    const [addKeyModalEnabled, setAddKeyModalEnabled] = useState<boolean>(false);

    const updateApiKeys = (): void => {
        getUserApiKeysList(useruid).then((response: any) => {
            setApiKeys(response);
        });
    };

    useEffect(() => {
        updateApiKeys();
    }, []);

    const columns = useMemo(() => ApiKeysColumns(updateApiKeys), []);
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data: apiKeys,
    });

    return (
        <div className='card'>
            <div className='me-4 mt-4 ms-auto'>
                <PrimaryButton icon='plus' buttonClickAction={() => setAddKeyModalEnabled(true)}>
                    Add API key
                </PrimaryButton>
            </div>
            <div className='card-body'>
                <div className='table-responsive position-relative '>
                    <table
                        id='kt_table_api_keys'
                        className='table align-middle table-row-dashed fs-6 gy-3 no-footer'
                        {...getTableProps()}
                    >
                        <thead>
                            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                {headers.map((column: ColumnInstance<ApiKeyRecord>) => (
                                    <ApiKeysHeaderColumn key={column.id} column={column} />
                                ))}
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                            {rows.map((row: Row<ApiKeyRecord>) => {
                                prepareRow(row);
                                return <ApiKeysRow row={row} key={`${row.id}`} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {addKeyModalEnabled && (
                <ApiKeyModal
                    updateAction={updateApiKeys}
                    onClose={() => setAddKeyModalEnabled(false)}
                />
            )}
        </div>
    );
};
