import {useEffect, Fragment} from 'react';
import {Grid, Button} from '@mui/material';
import API from '../API_Interface/API_Interface.js';
import * as DBcolumns from '../components/dbcolumns.js';

const SortSelect = ({viewColumns, setViewColumns, selectedItem}) => {
    console.log(`In SortSelect: selectedItem is ${selectedItem.toLowerCase()}`);

    useEffect(() => {
        const api = new API();
        console.log('Requesting viewSortSelection data from the API');

        async function getViewSelection() {
            const viewSelJSONData = await api.getViewSelectionData(selectedItem.toLowerCase());
            console.log(`Data for viewSortSelection from the API_Interface ${JSON.stringify(viewSelJSONData)}`);
            setViewColumns(viewSelJSONData.data);
        }

        if (selectedItem !== 'Summary') getViewSelection();
    }, [selectedItem, setViewColumns]);

    console.log(JSON.stringify(viewColumns));
    if (selectedItem === 'Summary' || viewColumns === undefined) return <Fragment/>
    return (
        <Grid container>
            {
               viewColumns.map((colName, idx) => {
                  return (
                      <Grid item
                            key={idx}
                            xs={1}
                        >
                          <Button>{colName}</Button>
                      </Grid>
                  )
               })
            }
        </Grid>
    );
}

export default SortSelect;
