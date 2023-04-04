import { TextField } from '@mui/material';
import useDebounceState from '@/hooks/useDebounceState';

interface FilterStringRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function FilterStringRow(props: FilterStringRowProps) {
  const [value, setValue] = useDebounceState<string>(props.value, () => props.onChange(value));

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label={props.label}
      multiline
      size="small"
      sx={{ width: '100%', maxWidth: '100%', mb: 4 }}
    />
  );
}
