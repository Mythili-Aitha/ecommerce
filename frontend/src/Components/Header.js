import {
  Box,
  Divider,
  Drawer,
  Tabs,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Actions } from "./Actions";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const {
    value,
    open,
    user,
    totalQuantity,
    setUser,
    handleSignOut,
    handleChange,
    toggleDrawer,
  } = Actions();
  const items = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 1,
        flexDirection: "column",
        padding: 3,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Button onClick={() => navigate("/home")}>Home</Button>
      <Button onClick={() => navigate("/products")}>Products</Button>
      <Button>Catergories</Button>
      <Divider />
      <Button onClick={() => navigate("/orders")}>Orders</Button>
      <Button>History</Button>
      <Button>Settings</Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 1,
          flexDirection: "column",
          position: "absolute",
          width: "100%",
          bottom: "0",
        }}
      >
        <Button>Switch Accounts</Button>
        {user ? (
          <Button onClick={handleSignOut}>
            <LogoutIcon />
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/auth");
            }}
          >
            <LoginIcon /> Sign in
          </Button>
        )}
        {user ? (
          <Button>
            <AccountCircleIcon /> {user.name}
          </Button>
        ) : (
          <Button onClick={() => navigate("/profile")}>
            <AccountCircleIcon /> Profile
          </Button>
        )}
      </Box>
    </Box>
  );
  return (
    <>
      <Box sx={{ width: "100%", gap: 2 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Drawer
            sx={{ "& .MuiPaper-root": { width: 250 } }}
            anchor={"left"}
            open={open}
            onClose={toggleDrawer(false)}
          >
            {items}
          </Drawer>
          <Box sx={{ display: "flex", alignItems: "center", width: "auto" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Dashboard Tabs"
            >
              <MenuIcon fontSize="large" onClick={toggleDrawer(true)} />
              <Tab label="All" value="1" onClick={() => navigate("/")} />
              <Tab label="Home" value="2" onClick={() => navigate("/home")} />
              <Tab
                label="Products"
                value="3"
                onClick={() => navigate("/products")}
              />
            </Tabs>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", width: "auto" }}>
            <TextField
              fullWidth
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
            {user ? (
              <IconButton
                color="inherit"
                sx={{ flexDirection: "column" }}
                onClick={() => navigate("/profile")}
              >
                <PersonIcon />
                <Typography variant="caption">{user.name}</Typography>
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                sx={{ flexDirection: "column" }}
                onClick={() => navigate("/auth")}
              >
                <PersonIcon />
                <Typography variant="caption">Log in/Sign Up</Typography>
              </IconButton>
            )}

            <IconButton
              color="inherit"
              sx={{ flexDirection: "column" }}
              onClick={() => navigate("/favorite")}
            >
              <FavoriteBorderIcon />
              <Typography variant="caption">Favorites</Typography>
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ flexDirection: "column" }}
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={totalQuantity} color="primary">
                <ShoppingCartIcon color="action" />
              </Badge>
              <Typography variant="caption">Cart</Typography>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
