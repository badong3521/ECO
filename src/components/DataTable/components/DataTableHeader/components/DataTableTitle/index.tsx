import React from 'react';
import { DataTable as RDataTable } from 'react-native-paper';
import { DataTableTitlePropTypes } from './types';

export default function DataTableTitle(props: DataTableTitlePropTypes) {
  const { children, numeric } = props;
  return <RDataTable.Title numeric={numeric}>{children}</RDataTable.Title>;
}
