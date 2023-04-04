import { Dispatch, SetStateAction, useState } from 'react';
import FilterHeader from '@/components/filters/header';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FilterStringRow from '@/components/filters/filter-string-row';
import FilterNumberRow from '@/components/filters/filter-number-row';
import FilterSelectRow from '@/components/filters/filter-select-row';
import FilterDateRangeRow from '@/components/filters/filter-date-range-row';

export interface FilterType {
  field: string;
  label: string;
  type: 'string' | 'number' | 'select' | 'date-range';
  rows?: {
    name: string;
    value: string;
  }[];
}

interface FiltersProps {
  buttonText: string;
  clearText: string;
  children?: any;
  onClear: () => void;
  filters?: {
    values: any;
    setValues: Dispatch<SetStateAction<any>>;
    types: FilterType[];
  }
}

export default function Filters(props: FiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ pb: 2 }}>
      <FilterHeader
        buttonText={props.buttonText}
        clearText={props.clearText}
        onClear={props.onClear}
        onOpen={() => setOpen(true)}
      />

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '250px',
            p: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{ mb: [2, 2, 4] }}
          >
            {props.buttonText}
          </Typography>

          {props.filters && props.filters.types.map((filterType) => {
            const value = props.filters?.values[filterType.field];
            const setValue = (newValue: any) => props.filters?.setValues((prevState: any) => ({ ...prevState, [filterType.field]: newValue }));

            if (filterType.type === 'string') {
              return (
                <FilterStringRow
                  key={filterType.field}
                  label={filterType.label}
                  value={value}
                  onChange={setValue}
                />
              );
            }

            if (filterType.type === 'number') {
              return (
                <FilterNumberRow
                  key={filterType.field}
                  label={filterType.label}
                  value={value}
                  onChange={setValue}
                />
              );
            }

            if (filterType.type === 'select') {
              return (
                <FilterSelectRow
                  key={filterType.field}
                  label={filterType.label}
                  labelId={filterType.field}
                  value={value || []}
                  onChange={(e) => setValue(e.target.value)}
                  rows={filterType.rows || []}
                  multiple
                />
              );
            }

            if (filterType.type === 'date-range') {
              return (
                <FilterDateRangeRow
                  key={filterType.field}
                  label={{ start: filterType.label, end: 'End' }}
                  value={value}
                  onChange={setValue}
                />
              );
            }

            return <div key={filterType.field} />;
          })}

          {props.children}
        </Box>
      </Drawer>
    </Box>
  );
}
