import { Button, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { _getAllClients } from "src/api/client";
import { _getAllServices } from "src/api/services";
import { Visit } from "src/api/visits";
import FormSelectInput from "src/components/shared/form/form-select-input";
import FormTextInput from "src/components/shared/form/form-text-input";
import FormTimePickerInput from "src/components/shared/form/form-time-picker-input";
import { ZIndex } from "src/utils/zIndex";
import { getInitialValues, validationSchema } from "./form";

interface Props {
  open: boolean;
  handleClose: () => void;
  date: string;
  visits: Visit[];
  visit?: Visit;
  onSubmit: (values: any) => Promise<void>;
  title: string;
  description: string;
  submitButtonLabel: string;
}

const VisitFormDialog: React.FC<Props> = ({
  open,
  handleClose,
  date,
  onSubmit,
  visits,
  visit,
  title,
  description,
  submitButtonLabel,
}) => {
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => _getAllClients(),
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => _getAllServices(),
  });

  const selectClientOptions =
    clients?.map((client) => ({
      label: `${client.first_name} ${client.last_name}`,
      value: client.id,
    })) ?? [];

  const selectServiceOptions =
    services?.map((service) => ({
      label: `${service.name}`,
      value: service.id,
    })) ?? [];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: ZIndex.DIALOG,
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent
          sx={{
            width: "600px",
          }}
        >
          <DialogContentText
            sx={{
              marginBottom: "20px",
            }}
          >
            {description}
          </DialogContentText>
          <Formik
            validationSchema={validationSchema(visits ?? [], date)}
            onSubmit={onSubmit}
            initialValues={getInitialValues(visit ?? ({} as Visit))}
          >
            <Form>
              <Stack direction="column" spacing={2}>
                <FormSelectInput
                  name="service_id"
                  label="Usługa"
                  options={selectServiceOptions}
                />
                <FormSelectInput
                  name="client_id"
                  label="Klient"
                  options={selectClientOptions}
                />
                <Stack direction="row" spacing={2}>
                  <FormTimePickerInput
                    autoFocus
                    label="Godzina rozpoczęcia"
                    name="time_start"
                    referenceDate={dayjs(date)}
                  />
                  <FormTimePickerInput
                    autoFocus
                    label="Godzina zakończenia"
                    name="time_end"
                  />
                </Stack>
              </Stack>
              <FormTextInput
                autoFocus
                margin="dense"
                label="Notatka"
                type="text"
                name="note"
                fullWidth
                multiline
                rows={2}
                maxRows={4}
              />

              <DialogActions
                sx={{
                  marginTop: "20px",
                }}
              >
                <Button onClick={handleClose} type="button">
                  Odrzuć
                </Button>
                <Button type="submit">{submitButtonLabel}</Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default VisitFormDialog;
