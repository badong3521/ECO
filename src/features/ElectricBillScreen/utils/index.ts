import { BillType } from '../../../services/api/types/dncEcoid';

export function extractUniqueBills(allBills?: BillType[]): BillType[] {
  return (
    allBills?.reduce((bills: BillType[], bill) => {
      if (!bill.billId || bills.find(b => b.billId === bill.billId))
        return bills;
      return bills.concat(bill);
    }, []) || []
  );
}

export default {
  extractUniqueBills,
};
