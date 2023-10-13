import {useState, Fragment} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Stack, Button} from '@mui/material';

const ITEM_HEIGHT = 48;

export default function MenuSet({anchorIDs, setAnchorIDs, setNumTransactions, selectedItem, options}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dbPacketKeys = Object.keys(options[0]);
  let newAnchorIDs = { cycleID: options[0]['cycleID'] };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (selection, idx) => {
    switch (selection) {
      case 'cycleID':
        newAnchorIDs = {...options[idx], cycleID: options[idx][selection]};
        break;
      case 'accountID':
        newAnchorIDs = {...options[idx], accountID: options[idx][selection]};
        break;
      case 'marketID':
        newAnchorIDs = {...options[idx], marketID: options[idx][selection]};
        break;
      case 'routeID':
        newAnchorIDs = {...options[idx], routeID: options[idx][selection]};
        break;

      default:
        break;
    }
    setNumTransactions(options[idx]['cycleID']);
    setAnchorIDs(newAnchorIDs);
    setAnchorEl(null);
  };

  console.log(`In MenuSet: options is ${JSON.stringify(options)}`);

  return (
    <Stack direction='row' spacing={1} justifyContent='flex-end' >
      {
          dbPacketKeys.map((selectField, idx) => (
              <>
                  <Button variant='contained'
                    key={`long-button${idx}`}
                    aria-label="more"
                    id={`long-button${idx}`}
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                      {selectField.replace(/([A-Z][a-zD])/g, ' $1')}
                  </Button>
                  <Menu
                    key={`long-menu${idx}`}
                    id={`long-menu${idx}`}
                    MenuListProps={{
                      'aria-labelledby': `long-button${idx}`,
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
                    {
                        options.map((option, optIdx) => {
                            return (
                              <MenuItem key={`${selectField}:${optIdx}`} selected={optIdx === 0}
                                        onClick={() => handleClose(selectField, optIdx)}>
                                  {options[optIdx][selectField]}
                              </MenuItem>
                            );
                        })
                    }
                  </Menu>
              </>
              )
          )
      }
    </Stack>
  );
};

