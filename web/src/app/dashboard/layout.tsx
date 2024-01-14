import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChairIcon from "@mui/icons-material/Chair";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import AccountMenu from "src/components/layout/account-menu";
import { ZIndex } from "src/utils/zIndex";

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: "Kalendarz wizyt", href: "/dashboard", icon: CalendarMonthIcon },
  { text: "Klienci", href: "/dashboard/clients", icon: ChairIcon },
  { text: "Fryzjerzy", href: "/dashboard/employees", icon: BadgeIcon },
  { text: "Usługi", href: "/dashboard/services", icon: DashboardIcon },
  { text: "Magazyn", href: "/dashboard/products", icon: DashboardIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: ZIndex.APP_BAR }}>
        <Toolbar sx={{ backgroundColor: "background.paper" }}>
          <DashboardIcon
            sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}
          />
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction={"row"}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="h6" color="text.primary">
              Kleopatra - Salon Fryzjerski
            </Typography>
            <AccountMenu />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: ["48px", "56px", "64px"],
            height: "auto",
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {LINKS.map(({ text, href, icon: Icon }) => (
            <ListItem key={href} disablePadding>
              <ListItemButton component={Link} href={href}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ mt: "auto" }} />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          ml: `${DRAWER_WIDTH}px`,
          mt: ["48px", "56px", "64px"],
          p: 3,
        }}
      >
        {children}
      </Box>
    </>
  );
}
