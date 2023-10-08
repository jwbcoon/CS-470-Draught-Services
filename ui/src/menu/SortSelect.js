import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import API from '../API_Interface/API_Interface.js';

const SortSelect = ({dbcolumns, setViewColumns, selectedItem}) => {

    useEffect(() => {
        const api = new API();

        async function getListSelection(cycleID) {
            const transactionsJSONString = await api.getTransactionCountPerCycle(cycleID);
            console.log(`transactions from the DB ${JSON.stringify(transactionsJSONString)}`);
            setViewColumns(transactionsJSONString.data);
        }

        if (selectedItem === 'Transactions') {
          getListSelection(281);
        }
    }, [selectedItem]);

    console.log(JSON.stringify(dbcolumns));
    return (
        <Grid container>
            {
               dbcolumns.map((colName, idx) => {
                   <Grid item
                         key={idx}
                         xs={1}
                    >
                      <Button>{colName}</Button>
                   </Grid>
               })
            }
        </Grid>
    );
}

export default SortSelect;
