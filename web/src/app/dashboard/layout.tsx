import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
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
import logo from "./logo.png"
import Image from 'next/image';

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: "Kalendarz wizyt", href: "/dashboard", icon: CalendarMonthIcon },
  { text: "Klienci", href: "/dashboard/clients", icon: PeopleIcon },
  { text: "Fryzjerzy", href: "/dashboard/employees", icon: BadgeIcon },
  { text: "Usługi", href: "/dashboard/services", icon: ContentCutIcon },
  { text: "Magazyn", href: "/dashboard/products", icon: StorefrontIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: ZIndex.APP_BAR }}>
        <Toolbar sx={{ backgroundColor: "#F4F4F4" }}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction={"row"}
            sx={{
              width: "100%",
            }}
          >
            <Image src={logo.src} alt="logo aplikacji" width={150} height={100} /> 
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
            top: ["75px", "83px", "91px"],
            height: "auto",
            bottom: 0,
            backgroundColor: "#FCFCFC",
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
          mt: ["70px", "78px", "86px"],
          p: 3,
        }}
      >
        {children}
      </Box>
    </>
  );
}
