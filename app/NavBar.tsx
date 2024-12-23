"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import CustomizedMenus from "./Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";

// const pages = [
//   { title: "New/Latest", href: "/new-latest","submenu":[] },
//   { title: "Popular", href: "./","submenu":[] },
//   {
//     title: "Music Categories",
//     href: "./",
//     subMenu: ["Pop", "Rock", "Jazz", "Hip Hop", "R & B", "Classic"],
//   },
//   { title: "Singers", href: "./","submenu":[] },
//   { title: "Top Chart", href: "./","submenu":[] },
// ];
interface Page {
  id: string;
  title: string;
  href: string;
  subMenu?: string[];
}
// const settings = [
//   {title:"Account",href:""},
//   {title:"Login",href:"/login"},
//   {title:"Logout",href:""}
// ];

function ResponsiveAppBar() {

  const [pages, setPages] =  React.useState<Page[]>([]);
  React.useEffect(() => {
    async function fetchPages() {
      try {
        const response = await axios.get('/api/pages');
        setPages(response.data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    }

    fetchPages();
  }, []);

  const { data: session,status } = useSession(); // Using the `useSession` hook to get the session
  React.useEffect(() => {
    // Log session data to see if you are logged in or logged out
    // if (status === "loading") {
    //   console.log("Loading session...");}
    console.log("Session:", session);
  }, [session,status])
  const settings = session
    ? [
        { id:"1",title: "Profile", href: `/profile/${session?.user?.id}` }, // Update this with the correct account page link
        { id:"2",title: "Logout", href: "#", onClick: () => signOut() }, // Logout action
      ]
    : [
        { id:"1",title: "Profile", href: "" }, // Placeholder if user isn't logged in
        { id:"2",title: "Login", href: "/login" }, // Login link for logged-out users
      ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const router = usePathname();
  React.useEffect(() => {
    // Update the title based on the current route
    const currentPage = pages.find((page) => page.href === router);
    document.title = currentPage ? currentPage.title : "MAA MUSIC";
  }, [router]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" className="bg-[#111827]">
          <Toolbar disableGutters>
            <AudiotrackOutlinedIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link href="/">MAA Music</Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <Link
                        href={`${page.href}`}
                        className={classNames({
                          "text-blue-500": page.href === router,
                          "text-black": page.href !== router,
                        })}
                      passHref>
                        {page.title}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AudiotrackOutlinedIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MAA Music
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              {pages.map((page) => (
                <Box key={page.id}>
                  {/* If the page has a submenu, render CustomizedMenus */}
                  {page.subMenu ? (
                    <CustomizedMenus
                      menuTitle={page.title}
                      subMenu={page.subMenu}
                    />
                  ) : (
                    <Link href={page.href} passHref>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          color: page.href === router ? "black" : "white",
                          display: "block",
                          "&:hover": {
                            backgroundColor: "lightblue",
                            color:"black" // Hover background color
                          },
                        }}
                      >
                        {page.title}
                      </Button>
                    </Link>
                  )}
                </Box>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
            {session ? (
              <Tooltip title="Open profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <Avatar
          alt={session?.user?.name || "User"}
          src={session?.user?.image || ""}
        >
          {/* Show the first letter of the user's name if no image is available */}
          {!session?.user?.image && session?.user?.name?.charAt(0).toUpperCase()}
        </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Login">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar />
      </IconButton>
    </Tooltip>
  )}
            
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.id} onClick={setting.onClick || handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <Link href={setting.href} passHref>
                      {setting.title}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
