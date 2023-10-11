import {useState, Fragment} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Stack, Button} from '@mui/material';

const ITEM_HEIGHT = 48;

export default function MenuSet({selectedItem, options}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dbPacketKeys = Object.keys(options[0]);

  console.log(`In MenuSet: options is ${JSON.stringify(options)}`);

  return (
    <Stack direction='row' spacing={1} justifyContent='flex-end' >
      {
          dbPacketKeys.map((selectField, idx) => (
              <>
                  <Button variant='contained'
                    key={idx}
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
                    key={idx}
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
                        options.map((option, idx) => {
                            return (
                              <MenuItem key={`${selectField}${idx}`} selected={option[selectField] === options[0][selectField]} onClick={handleClose}>
                                  {option[selectField]}
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

