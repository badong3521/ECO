import React from 'react';
import { DataTable as RDataTable } from 'react-native-paper';
import { DataTableCellPropTypes } from './types';

export default function DataTableCell(props: DataTableCellPropTypes) {
  const { children, numeric, style } = props;
  return (
    <RDataTable.Cell style={style} numeric={numeric}>
      {children}
    </RDataTable.Cell>
  );
}
