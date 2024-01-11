import { Button, Card, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { 
  Employee,
  UpsertEmployeePayload,
  _updateEmployee,
} from "src/api/employee";
import EmployeeFormDialog from "./employee-form-dialog";

interface Props {
  employee: Employee;
  allEmployees: Employee[];
  refetch: () => Promise<unknown>;
}

const EmployeeCard: 
  React.FunctionComponent<Props> = ({ 
    employee,
    allEmployees,
    refetch, 
  }) => {
  const [editEmployeeFormDialogOpen, setEditEmployeeFormDialogOpen] = React.useState<boolean>(false);

  const { mutateAsync: updateEmployee } = useMutation({
    mutationFn: (values: UpsertEmployeePayload) => _updateEmployee(values, employee.id),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (values: any) => {
    await updateEmployee({
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.phone,
      email: values.email,
      address: values.address,
      about: values.about,
    });

    setEditEmployeeFormDialogOpen(false);
  };

  return (
    <>
      <Card
        key={employee.id}
        sx={{
          padding: "20px",
          marginBottom: "20px",
          minWidth: "600px",
        }}
      >
        <Typography variant="h6" component="h6" fontWeight={700}>
          {employee.first_name} {employee.last_name}
        </Typography>
        <Stack direction={"row"} spacing={20}>
          <Stack direction={"column"}>
            <Typography variant="body1" component="p">
              Numer telefonu:{" "} 
              <Typography variant="body1" component="b" fontWeight={600}>
                  {employee.phone}
              </Typography>
            </Typography>
            <Typography variant="body1" component="p">
              Adres e-mail:{" "}
              <Typography variant="body1" component="b" fontWeight={600}>
                {employee.email}
              </Typography>
            </Typography>
            <Typography variant="body1" component="p">
              Adres:{" "}
              <Typography variant="body1" component="b" fontWeight={600}>
                {employee.address}
              </Typography>
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body1" component="p">
              Świadczone usługi:
            </Typography>
            <Typography variant="body1" component="p">
              O mnie:{" "}
              <Typography variant="body1" component="b" fontWeight={600}>
                {employee.about}
              </Typography>
            </Typography> 
          </Stack>
        </Stack>     
        <Button
              variant="contained"
              color="primary"
              onClick={() => setEditEmployeeFormDialogOpen(true)}
              sx={{
                marginTop: "20px",
              }}
            >
              Edytuj profil
        </Button>
      </Card>
      <EmployeeFormDialog
        employees={allEmployees ?? []}
        onSubmit={handleSubmit}
        open={editEmployeeFormDialogOpen}
        handleClose={() => setEditEmployeeFormDialogOpen(false)}
        title="Edytuj profil pracownika"
        description="Wypełnij formularz aby edytować profil"
        submitButtonLabel="Zapisz"
      />
    </>
  );
};
export default EmployeeCard;
