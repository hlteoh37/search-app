import * as React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import {Paper} from "@mui/material";
import BasicTimeline from "./Timeline";
import AutocompleteSearch from "./AutocompleteSearch";
import getCases from "./dataProvider";
import VerticalTabs from "./VerticalTabs";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const cases = getCases();

const relationToString = (relation) => {
  return `Location Overlap: ${relation.location}\nOverlap Start: ${relation.overlapStart}\nOverlap End: ${relation.overlapEnd}`
}

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [selectedCase, setSelectedCase] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <AutocompleteSearch searchables={cases} fieldSelector={(c) => c.name} onChangeCallback={v => {setSelectedCase(cases.find(c => c.name === v)); setLoading(false);}} fullWidth={true}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h2" gutterBottom>
                    Case ID : {loading ? "" : selectedCase.caseId}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Details
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Name : {loading ? "" : selectedCase.name}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Address : {loading ? "" : selectedCase.address}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Email : {loading ? "" : selectedCase.email}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Location History
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4} md={4} lg={4}>
                      <Typography variant="h5" gutterBottom>
                        Case
                      </Typography>
                      <BasicTimeline locationHistory={loading ? [] : selectedCase.locationHistory}/>
                    </Grid>
                    <Grid item xs={8} md={8} lg={8}>
                      <Typography variant="h5" gutterBottom>
                        Related cases
                      </Typography>
                      <VerticalTabs tabs={
                        loading ? [] : selectedCase.relatedLocation.map(
                          ({caseId, relations}) => {
                            return {
                              id: caseId,
                              name: cases.find(c => c.caseId === caseId).name,
                              content: relations.map(relationToString).join("\n\n")
                            }
                          }
                        )}/>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Mentions
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                      <VerticalTabs tabs={
                        loading ? [] : selectedCase.mentions.map(
                          ({mentionedCaseId, source}) => {
                            return {
                              id: mentionedCaseId,
                              name: cases.find(c => c.caseId === mentionedCaseId).name,
                              content: source
                            }
                          }
                        )}/>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}