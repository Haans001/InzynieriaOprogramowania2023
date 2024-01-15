"use client";
import { Box, Container, Paper, Tab, Tabs } from "@mui/material";
import * as React from "react";
import ChangePasswordForm from "src/components/employee/employee-profile/change-password-form";
import EmployeeProfile from "src/components/employee/employee-profile/employee-profile";
import { useAuth } from "src/providers/auth-provider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function EmployeePage() {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const { employee, isAdmin } = useAuth();

  return (
    <Container>
      <Paper sx={{ p: 2, mt: 2 }} elevation={3}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Profil" />
              <Tab label="Hasło" />
            </Tabs>
          </Box>
          <CustomTabPanel value={tab} index={0}>
            <EmployeeProfile />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <ChangePasswordForm />
          </CustomTabPanel>
        </Box>
      </Paper>
    </Container>
  );
}
