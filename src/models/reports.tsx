export interface DoughnutInterface {
  labels: string[];
  datasets: [
    {
      label: string;
      data: string[];
      backgroundColor?: string[]
    }
  ];
  options?: any;
}

export interface DetailReport {
  date: string;
  type: string;
  desc: string;
  amount: string;
}