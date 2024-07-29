export interface ExpenseType {
  id: string;
  name: string;
}

export interface ExpenseDetail {
  userId: string;
  userName: string;
  date: string;
  type: string;
  subDetailList: ExpenseSubDetail[];
}

export interface ExpenseSubDetail {
  category: string;
  description: string;
  amount: string
  channel: string
}