import { TextField } from '@mui/material';
import useDebounceState from '@/hooks/useDebounceState';

interface FilterNumberRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const validateNumbers = (n: string): string => n.replace(/[^\d,]+/g, '');

export default function FilterNumberRow(props: FilterNumberRowProps) {
  const [value, setValue] = useDebounceState<string>(props.value, () => props.onChange(value));

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(validateNumbers(e.target.value))}
      label={props.label}
      type="number"
      multiline
      size="small"
      sx={{ width: '100%', maxWidth: '100%', mb: 4 }}
    />
  );
}
