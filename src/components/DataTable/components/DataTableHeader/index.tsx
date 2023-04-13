import React from 'react';
import { DataTable as RDataTable } from 'react-native-paper';
import { DataTableHeaderPropTypes } from './types';

export default function DataTableHeader(props: DataTableHeaderPropTypes) {
  const { children } = props;
  return <RDataTable.Header>{children}</RDataTable.Header>;
}
