import { TimePicker, TimePickerProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useField } from "formik";
import { ZIndex } from "src/utils/zIndex";

interface Props {
  name: string;
}

const FormTimePickerInput: React.FunctionComponent<
  Props & TimePickerProps<Dayjs>
> = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <TimePicker
      {...props}
      value={dayjs(field.value)}
      onChange={(value) => {
        console.log(value?.toISOString());
        field.onChange({
          target: {
            name,
            value: value?.toISOString(),
          },
        });
      }}
      format="HH:mm"
      slotProps={{
        popper: {
          sx: {
            zIndex: ZIndex.POPPER,
          },
        },
        textField: {
          error: meta.touched && Boolean(meta.error),
          helperText: meta.touched && meta.error,
          fullWidth: true,
        },
      }}
    />
  );
};

export default FormTimePickerInput;
