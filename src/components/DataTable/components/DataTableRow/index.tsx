import React from 'react';
import { DataTable as RDataTable } from 'react-native-paper';
import { DataTableRowPropTypes } from './types';

export default function DataTableRow(props: DataTableRowPropTypes) {
  const { children } = props;
  return <RDataTable.Row>{children}</RDataTable.Row>;
}
