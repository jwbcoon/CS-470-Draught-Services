import {useEffect, Fragment} from 'react';
import {Grid, Box} from '@mui/material';
import API from '../API_Interface/API_Interface.js';

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

        if (!selectedItem.match(  /[sS]ummary/)) getViewSelection();
    }, [selectedItem, setViewColumns]);

    console.log(JSON.stringify(viewColumns));
    if (!selectedItem.match(/[sS]ummary/) || viewColumns === undefined) return <Fragment/>
    return (
        <Grid container>
            {
               viewColumns.map((colName, idx) => {
                  return (
                      <Grid item
                            key={idx}
                            xs={1}
                        >
                          <Box sx={{ height: '100%', width: '100%', backgroundColor: 'white', borderWidth: '1px', borderStyle: 'solid', borderColor: 'black' }}>
                              {colName}
                          </Box>
                      </Grid>
                  )
               })
            }
        </Grid>
    );
}

export default SortSelect;
