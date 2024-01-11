"use client";
import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { _getAllEmployees } from "src/api/employee";
import EmployeeCard from "./employee-card";

const Employees: React.FunctionComponent = () => {
  const { 
    data: employees,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => _getAllEmployees(),
  });

  if (isLoading) {
    return <Typography>Ładowanie...</Typography>;
  }
  
  return (
    <>
      <Typography variant="h5" component="h5" fontWeight={700}>
        Lista pracowników
      </Typography>
      <Stack
        sx={{
          marginTop: "20px",
        }}
      >
        {employees?.map((employee) => (
          <EmployeeCard 
          key={employee.id}
          employee={employee}
          allEmployees={employees ?? []}
          refetch={refetch}
          />
        ))}
      </Stack>
    </>
  );
};

export default Employees;
