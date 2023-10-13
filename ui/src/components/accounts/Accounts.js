import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface';
import {accountsTableAttributes} from '../DBattrs.js';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RowDescriptor from '../RowDescriptor';


export default function AccountsTable(props) {


    const [accounts, setAccounts] = useState([]);
    console.log(`in AccountsTable contains ${JSON.stringify(accounts)}`);


    useEffect(() => {
        const api = new API();

        async function getAccounts() {
            const accountsJSONString = await api.allAccounts();
            console.log(`accounts from the DB ${JSON.stringify(accountsJSONString)}`);
            setAccounts(accountsJSONString.data);
        }

        getAccounts();
    }, []);


    return <Fragment>
        {
            accounts.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="account table">
                        <TableHead>
                            <TableRow>
                                {
                                    accountsTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                accounts.map((account, idx) =>
                                    <RowDescriptor rowObject={account} key={idx} />
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}

