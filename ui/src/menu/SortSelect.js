import {useState, useEffect, Fragment} from 'react';
import {Grid, Box} from '@mui/material';
import API from '../API_Interface/API_Interface.js';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

const LongMenu = ({selectedItem, options}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => {
            const optKey = `${selectedItem.toLowerCase().replace(/s$/, 'ID')}`;
            return (
              <MenuItem key={option[optKey]} selected={option[optKey] === options[0][optKey]} onClick={handleClose}>
                {option[optKey]}
              </MenuItem>
            );
          })
        }
      </Menu>
    </div>
  );
};

export default function SortSelect({viewColumns, setViewColumns, selectedItem}) {
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

    console.log(`In SortSelect: viewColumns is ${JSON.stringify(viewColumns)}`);
    if (!selectedItem.match(/[sS]ummary/) || viewColumns === undefined) return <Fragment/>
    return (
        <LongMenu selectedItem={selectedItem} options={viewColumns}/>
    );
}

