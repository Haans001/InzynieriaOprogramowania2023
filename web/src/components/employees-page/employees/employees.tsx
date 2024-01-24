"use client";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import {
  UpsertEmployeePayload,
  _addEmployee,
  _getAllEmployees,
} from "src/api/employee";
import { useAuth } from "src/providers/auth-provider";
import EmployeeCard from "./employee-card";
import EmployeeFormDialog from "./employee-form-dialog";

const Employees: React.FunctionComponent = () => {
  const {
    data: employees,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => _getAllEmployees(),
  });

  const { isAdmin } = useAuth();

  const [addEmployeeFormDialogOpen, setAddEmployeeFormDialogOpen] =
    React.useState<boolean>(false);

  const { mutateAsync: addEmployee } = useMutation({
    mutationFn: (values: UpsertEmployeePayload) => _addEmployee(values),
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return <Typography>Ładowanie...</Typography>;
  }

  return (
    <>
      <Typography variant="h5" component="h5" fontWeight={300}>
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
      {isAdmin && (
        <>
          <Button
            variant="contained"
            size="large"
            onClick={() => setAddEmployeeFormDialogOpen(true)}
            sx={{
              color: "white",
              backgroundColor: "#C6A619",
              fontWeight: "400",
              marginTop: "20px",
              '&:hover': {
                backgroundColor: "#857013", 
              },
            }}
          >
            Dodaj pracownika
          </Button>
          <EmployeeFormDialog
            onSubmit={async (values) => {
              console.log(values);
              await addEmployee(values);
              setAddEmployeeFormDialogOpen(false);
            }}
            open={addEmployeeFormDialogOpen}
            handleClose={() => setAddEmployeeFormDialogOpen(false)}
            title="Dodaj pracownika"
            description="Wypełnij formularz aby dodać profil"
            submitButtonLabel="Zapisz"
          />
        </>
      )}
    </>
  );
};

export default Employees;
