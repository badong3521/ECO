import React from 'react';
import { DataTable as RDataTable } from 'react-native-paper';
import { DataTablePropTypes } from './types';

// The general hierarchy of the component should look like this
// <DataTable>
//  <DataTableHeader>
//    <DataTableTitle></DataTableTitle>
//  </DataTableHeader>
//
//  <DataTableRow>
//    <DataTableCell></DataTableCell>
//    <DataTableCell></DataTableCell>
//  </DataTableRow>
//
//  <DataTable.Row>
//    <DataTableCell></DataTableCell>
//    <DataTableCell></DataTableCell>
//  </DataTableRow>
//
// </DataTable>

export default function DataTable(props: DataTablePropTypes) {
  const { children, style } = props;
  return <RDataTable style={style}>{children}</RDataTable>;
}
