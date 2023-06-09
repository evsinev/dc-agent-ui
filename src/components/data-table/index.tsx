import { SxProps } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Empty from '@/components/data-table/empty';
import Column, { DataTableColumn } from './column';
import Pagination, { PaginationProps } from './pagination';

export type DataTableRow = Record<string, any>;

interface DataTableProps {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  loading?: boolean;
  pagination?: PaginationProps;
  emptyText?: string;
  sx?: SxProps;
}

export default function DataTable(props: DataTableProps) {
  return (
    <Paper sx={{ minWidth: 0, maxWidth: '100%', width: '100%', overflowX: 'auto' }}>
      <TableContainer>
        <Table sx={props.sx}>
          <TableHead>
            <TableRow>
              {props.columns?.map((column) => (
                <Column key={column.field} column={column} />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.rows
              ?.filter((row, rowIndex) => (props.pagination?.size ? rowIndex < props.pagination.size : true))
              ?.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {props.columns.map((column) => (
                    <Column
                      key={`row-${rowIndex}-col-${column.field}`}
                      column={column}
                    >
                      {row[column.field]}
                    </Column>
                  ))}
                </TableRow>
              ))}

            {props.rows?.length === 0 && <Empty colSpan={props.columns?.length} emptyText={props.emptyText} />}
          </TableBody>
        </Table>
      </TableContainer>

      {props.pagination
        && (
        <Pagination
          {...props.pagination}
          disabled={props.loading}
          nextIconDisabled={props.rows?.length < (props.pagination?.size || 0) + 1}
        />
        )}
    </Paper>
  );
}
