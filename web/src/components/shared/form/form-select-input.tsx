import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  SelectProps,
} from "@mui/material";
import { useField } from "formik";

interface Props {
  name: string;
  options: {
    value: any;
    label: string;
  }[];
}

const FormSelectInput: React.FunctionComponent<Props & SelectProps> = ({
  name,
  options,
  label,
  ...props
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);
  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        native
        labelId={`${name}-label`}
        id={name}
        {...props}
        value={field.value}
        name={name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={meta.touched && Boolean(meta.error)}
        slotProps={{}}
        input={<OutlinedInput label={label} id={`${name}-label`} />}
      >
        <option aria-label="None" value="" />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {hasError && (
        <FormHelperText
          sx={{
            color: "#d32f2f",
          }}
        >
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelectInput;
