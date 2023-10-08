import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import API from '../API_Interface/API_Interface.js';
import * as DBcolumns from '../components/dbcolumns.js';

const SortSelect = ({viewColumns, setViewColumns, selectedItem}) => {

    useEffect(() => {
        const api = new API();

        async function getListSelection() {
            const viewSelJSONData = await api.getViewSelectionData();
            console.log(`summary from the API_Interface ${JSON.stringify(viewSelJSONData)}`);
            setViewColumns(viewSelJSONData.data);
        }

        getListSelection();
    }, [selectedItem]);

    console.log(JSON.stringify(viewColumns));
    return (
        <Grid container>
            {
               viewColumns.map((colName, idx) => {
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
