import { Button, Card, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { Employee } from "src/api/auth";
import { _deleteEmployee } from "src/api/employee";
import DeleteModal from "src/components/shared/delete-dialog";
import { useAuth } from "src/providers/auth-provider";

interface Props {
  employee: Employee;
  allEmployees: Employee[];
  refetch: () => Promise<unknown>;
}

const EmployeeCard: React.FunctionComponent<Props> = ({
  employee,
  refetch,
}) => {
  const { isAdmin } = useAuth();

  const [deleteEmployeeDialogOpen, setDeleteEmployeeDialogOpen] =
    React.useState<boolean>(false);

  const { mutateAsync: deleteEmployee } = useMutation({
    mutationFn: () => _deleteEmployee(employee.id),
    onSuccess: () => {
      refetch();
    },
  });

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
            <Typography variant="body1" component="p" fontWeight={500}>
              Adres e-mail:{" "}
              <Typography variant="body1" component="b" fontWeight={300}>
                {employee.email}
              </Typography>
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="body1" component="p" fontWeight={500}>
              Ranga :{" "}
              <Typography variant="body1" component="b" fontWeight={300}>
                {employee.role === "ADMIN" ? "Administrator" : "Pracownik"}
              </Typography>
            </Typography>
            <Typography variant="body1" component="p" fontWeight={500}>
              O mnie:{" "}
              <Typography variant="body1" component="b" fontWeight={300}>
                {employee.about}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
        {isAdmin && (
          <>
            <Button
              variant="contained"
              onClick={() => setDeleteEmployeeDialogOpen(true)}
              sx={{
                fontWeight: "400",
                color: "#FCF9EC",
                backgroundColor: "#B32222",
                marginTop: "20px",
                '&:hover': {
                  backgroundColor: "red", 
                },
              }}
            >
              Usuń pracownika
            </Button>
            <DeleteModal
              onConfirm={() => deleteEmployee()}
              title="Usuń pracownika"
              description={`Czy napewno chcesz usunąć ${employee.first_name} ${employee.last_name} z firmy?`}
              open={deleteEmployeeDialogOpen}
              onClose={() => setDeleteEmployeeDialogOpen(false)}
            />
          </>
        )}
      </Card>
    </>
  );
};
export default EmployeeCard;
