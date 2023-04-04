import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import FilterIcon from '@mui/icons-material/FilterAlt';
import Divider from '@mui/material/Divider';

interface FilterHeaderProps {
  buttonText: string;
  clearText: string;
  onClear: () => void;
  onOpen: () => void;
}

export default function FilterHeader(props: FilterHeaderProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Button
          onClick={props.onClear}
          startIcon={<ClearIcon />}
          variant="text"
          size="small"
          sx={{ ml: 1, mr: 1 }}
        >
          {props.clearText}
        </Button>
        <Button
          onClick={props.onOpen}
          startIcon={<FilterIcon />}
          variant="outlined"
          size="small"
        >
          {props.buttonText}
        </Button>
      </Box>
      <Divider />
    </>
  );
}
