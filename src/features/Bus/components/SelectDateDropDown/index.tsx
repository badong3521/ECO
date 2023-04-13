import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../../../components/Dropdown';

interface DateProps {
  value: string;
  date: Date;
}

let dateRange: DateProps[];

interface SelectDateDropDownProps {
  itemsCount: number;
  onSelectedDate: (date: Date) => void;
}

// Show a DropDown to choose a Date in range (from Today to {{itemsCount}} day later)
export default function SelectDateDropDown(props: SelectDateDropDownProps) {
  const { itemsCount, onSelectedDate } = props;
  const int18 = useTranslation();

  function parseRangeDate() {
    const currentDate = new Date();
    dateRange = [
      {
        value: int18.t('features.busScreen.stopDetail.today'),
        date: new Date(),
      },
    ];
    for (let i = 0; i < itemsCount; i += 1) {
      currentDate.setDate(currentDate.getDate() + 1);
      dateRange.push({
        value: `${currentDate.getDate()}/${currentDate.getMonth() +
          1}/${currentDate.getFullYear()}`,
        date: new Date(currentDate),
      });
    }
  }

  function onChangeDate(text: string, index: number) {
    onSelectedDate(dateRange[index].date);
  }

  useEffect(() => {
    parseRangeDate();
  }, []);

  return (
    <Dropdown
      data={dateRange}
      value={int18.t('features.busScreen.stopDetail.today')}
      onChangeText={onChangeDate}
      label=""
    />
  );
}
