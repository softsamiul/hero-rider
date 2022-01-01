import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { Button } from "@mui/material";
import useAuth from "../../../Hooks/useAuth";
import MakeAdmin from "./MakeAdmin/MakeAdmin";
import RegisteredUsers from "./RegisteredUsers/RegisteredUsers";

const drawerWidth = 240;

function AdminDashBoardHome(props) {
  const { user } = useAuth();
  const [usersAll, setAllUsers] = React.useState([]);
  React.useEffect(() => {
    fetch(`https://rocky-island-87400.herokuapp.com/riderUsersCollection`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  const currentUser = usersAll.find(
    (singleUser) => singleUser.fullName === user.displayName
  );


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let { path, url } = useRouteMatch();
  const { logOut } = useAuth();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <Box>
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "black", textAlign: "left" }}
        >
           
          <Button style={{ textAlign: "left", color: "#000" }}>
            <i className="fas fa-user-circle me-2"></i> GO To Peofile 
          </Button>
        </Link>
        <Divider />

        {currentUser?.role ?<Box>
          <Link
            to={`${url}/makeadmin`}
            style={{ textDecoration: "none", color: "black" }}
          >
            
            <Button style={{ textAlign: "left", color: "#000" }}>
              <i className="fas fa-user-ninja me-2"></i>Make Admin
            </Button>
          </Link> 
          <Divider />
          <Link
            to={`${url}/registeredusers`}
            style={{ textDecoration: "none", color: "black" }}
          >
            
            <Button style={{ textAlign: "left", color: "#000" }}>
              <i className="fas fa-users me-2"></i> Registered Users 
            </Button>
          </Link> 
          <br />
        </Box> : ''}
      </Box>
      <Divider />

      <Button onClick={logOut} style={{ marginLeft: "60px", color: "black" }}>
        <i className="fas fa-sign-out-alt me-2"></i>Log Out
      </Button>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{ background: "#8A2BE2" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <i className="fas fa-tachometer-alt me-2"></i> Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Switch>
          <Route exact path={path}>
              
          </Route>

          <Route path={`${path}/makeadmin`}>
            <MakeAdmin></MakeAdmin>
          </Route>
          <Route path={`${path}/registeredusers`}>
            <RegisteredUsers></RegisteredUsers>
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

AdminDashBoardHome.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminDashBoardHome;
