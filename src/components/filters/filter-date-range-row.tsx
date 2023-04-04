import { useState } from 'react';
import Box from '@mui/material/Box';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro';

export interface FilterDateRangeValue {
  startDate?: string;
  endDate?: string;
}

interface FilterDateRangeRowProps {
  label: { start: string, end: string };
  value?: FilterDateRangeValue;
  onChange: ({ startDate, endDate }: FilterDateRangeValue) => void;
}

export default function FilterDateRangeRow(props: FilterDateRangeRowProps) {
  const [value, setValue] = useState<FilterDateRangeValue>(props.value || {});

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', mb: 4 }}>
      <MobileDateRangePicker
        localeText={props.label}
        value={[value.startDate, value.endDate]}
        onChange={(newValue) => setValue({ startDate: newValue[0] as string, endDate: newValue[1] as string })}
        onAccept={() => props.onChange(value)}
      />
    </Box>
  );
}
