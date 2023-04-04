import type { SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

interface FilterSelectRowProps {
  labelId: string;
  label: string;
  value: unknown;
  onChange: (e: SelectChangeEvent<unknown>) => void
  rows: {
    name: string;
    value: string;
  }[];
  multiple?: boolean;
}

export default function FilterSelectRow(props: FilterSelectRowProps) {
  return (
    <FormControl sx={{ width: '100%', maxWidth: '100%', mb: 4 }}>
      <InputLabel id={props.labelId} size="small">{props.label}</InputLabel>
      <Select
        labelId={props.labelId}
        value={props.value}
        onChange={props.onChange}
        multiple={props.multiple}
        size="small"
        sx={{ width: '100%', maxWidth: '100%' }}
        input={<OutlinedInput label={props.label} />}
      >
        {props.rows?.map((row) => (
          <MenuItem value={row.value} key={row.value}>{row.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
