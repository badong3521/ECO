import React from 'react';

export type CardActionType = {
  icon: React.ReactNode;
  type:
    | 'settings'
    | 'helpDesk'
    | 'bookmarks'
    | 'electricBill'
    | 'manageCalendar';
  content?: string;
  totalBills?: number;
};
