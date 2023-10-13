import React, {Fragment, useState, useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {presentationComponents, containerComponents}  from './MenuPresentationComponents';
import MenuSet from './MenuSet';
import DropDown from './DropDown';
import API from '../API_Interface/API_Interface.js';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' })(
    ({theme, open}) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const TopBar = ({open, handleDrawerOpen, anchorIDs, setAnchorIDs,
                setNumTransactions, viewColumns, selectedItem, title,
                user, logoutAction}) => {
    // This component is responsible for rendering the Toolbar that is drawn
    // at the top of the drawer.

    return (
        <Fragment>
            <AppBar position="fixed" open={open} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                    <Box width="100%" justifyContent="center" flex={1}>
                        <Typography variant="h6" noWrap component="div" align="center">
                            {user.unpack()}
                        </Typography>
                    </Box>
                    {
                        viewColumns &&
                        <MenuSet anchorIDs={anchorIDs} setAnchorIDs={setAnchorIDs} setNumTransactions={setNumTransactions} selectedItem={selectedItem} options={viewColumns}/>
                    }
                    <Box width="100%" justifyContent="right" flex={1}>
                        <Typography variant="h7" noWrap component="div" align="right" onClick={() => logoutAction()}>
                            Logout
                        </Typography>
                    </Box>

                </Toolbar>
            </AppBar>
        </Fragment>
    )
};

const PresentationListItems = ({menuItemTitles, selectedItem, target, setTarget,
                                dropOpen, onClick, onDropDownClick}) => {
    return <div>
        {
            menuItemTitles.map(title => {
                if (title === 'Transactions')
                    return (
                        <>
                            <ListItem button onClick={() => onClick(title)} key={title}>
                                <ListItemText primary={title} key={title}/>
                                {
                                    selectedItem === title &&
                                    <ListItemIcon>
                                        {
                                            dropOpen
                                            ? <ExpandMore onClick={() => onDropDownClick()}/>
                                            : <ChevronRightIcon onClick={() => onDropDownClick()}/>
                                        }
                                    </ListItemIcon>
                                }
                            </ListItem>
                            {
                                dropOpen && selectedItem.match(/[tT]ransactions/) &&
                                <DropDown target={target} setTarget={setTarget}/>
                            }
                        </>
                    );
                else
                    return (
                        <ListItem button onClick={() => onClick(title)} key={title}>
                            <ListItemText primary={title} key={title}/>
                            {
                                selectedItem === title && <ListItemIcon><ChevronRightIcon/></ListItemIcon>
                            }
                        </ListItem>
                    );
            })
        }
    </div>;
};

const findSelectedComponent = (selectedItem, dropOpen, dropDownTarget, params) => {
    console.log(`findSelectedComponent::target is: ${dropDownTarget}`);
    const component = [...presentationComponents(),
                       ...containerComponents({dropOpen: dropOpen, index: dropDownTarget, params: params})]
                           .filter(comp => comp.title === selectedItem || (dropOpen && comp.title.match(/DropDown/)));
    if (component.length === 1)
        return component[0];
    if (component.length === 2)
        return component[1];

    console.log("In findSelectedComponent of MakeEligible. Didn't find the component that corresponds to the menu item.")
    return {
        title: null,
        component: null
    }
};

export default function MainDrawer({title, user, logoutAction}) {
    const theme = useTheme();
    const [numTransactions, setNumTransactions] = useState({cycleID: 0, tot_transactions: 0});
    const [open, setOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Summary');
    const [target, setTarget] = useState(0);
    const [viewColumns, setViewColumns] = useState(undefined);
    const [anchorIDs, setAnchorIDs] = useState(
        {
            cycleID: 0,
            accountID: 0,
            marketID: 0,
            routeID: 0
        }
    );

    console.log(`in MainDrawer;\ntarget is: ${target}\nanchorIDs is: ${JSON.stringify(anchorIDs)}`);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSelectedItem = (title) => {
        setSelectedItem(title);
    };

    const handleDropDownClick = () => {
        setDropOpen(!dropOpen);
    }

    useEffect(() => {
        const api = new API();
        console.log('Requesting viewSortSelection data from the API');

        async function getViewSelection() {
            const viewSelectionJSONData = await (
                                          anchorIDs
                                          ? api.getViewSelectionData()
                                          : api.getViewSelectionMaxes()
                                          );
            console.log(`Data for viewSelection from the API_Interface ${JSON.stringify(viewSelectionJSONData)}`);
            setViewColumns(viewSelectionJSONData.data);
            if (!anchorIDs) setAnchorIDs(viewSelectionJSONData.data[0]);
        }
        
        async function getTransactionsThisCycle() {
            const numTransactionsJSONData = await api.getTransactionCountPerCycle(anchorIDs);
            console.log(`Data for numTransactionsJSONData from the API_Interface ${JSON.stringify(numTransactionsJSONData)}`);
            setNumTransactions(numTransactionsJSONData.data[0]);
        }

        if (numTransactions.cycleID !== anchorIDs.cycleID) getTransactionsThisCycle();
        getViewSelection();
    }, [anchorIDs, target]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar title={title} open={open} viewColumns={viewColumns}
                    handleDrawerOpen={handleDrawerOpen} user={user}
                    anchorIDs={anchorIDs}
                    setAnchorIDs={setAnchorIDs}
                    setNumTransactions={setNumTransactions}
                    logoutAction={logoutAction}
                    selectedItem={selectedItem}/>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <PresentationListItems selectedItem={selectedItem}
                                           dropOpen={dropOpen}
                                           onClick={handleSelectedItem}
                                           onDropDownClick={handleDropDownClick}
                                           target={target}
                                           setTarget={setTarget}
                                           menuItemTitles={presentationComponents().map(comp => comp.title)}
                    />
                </List>
            </Drawer>
            {
                (open && viewColumns && !selectedItem.match(/[sS]ummary/))
                ?   <Main open={open} alignItems='space-between'>
                        <Stack>
                            <DrawerHeader />
                                <Box>
                                    <Typography>
                                        Transactions for cycle {anchorIDs.cycleID}:
                                        {`\n${numTransactions.tot_transactions >= 0 ? numTransactions.tot_transactions : 0}`}
                                    </Typography>
                                </Box>
                                <Stack orientation='horizontal' justifyContent='flex-start' alignItems='flex-end'>
                                    {
                                        Object.keys(anchorIDs).map(key =>
                                        <Box>
                                            <Typography>{`${key}: ${anchorIDs[key]}`}</Typography>
                                        </Box>
                                        )
                                    }
                                </Stack>
                            {findSelectedComponent(selectedItem, dropOpen, target, anchorIDs).component}
                        </Stack>
                    </Main>
                :   <Main open={open} alignItems='space-between'>
                        <DrawerHeader />
                            <Box>
                                <Typography>
                                    Transactions for cycle {anchorIDs.cycleID}:
                                    {`\n${numTransactions.tot_transactions >= 0 ? numTransactions.tot_transactions : 0}`}
                                </Typography>
                            </Box>
                            <Stack orientation='horizontal' justifyContent='flex-start' alignItems='flex-end'>
                                {
                                    Object.keys(anchorIDs).map(key =>
                                    <Box>
                                        <Typography>{`${key}: ${anchorIDs[key]}`}</Typography>
                                    </Box>
                                    )
                                }
                            </Stack>
                        {findSelectedComponent(selectedItem, dropOpen, target, anchorIDs).component}
                    </Main>
            }
        </Box>
    );
}
