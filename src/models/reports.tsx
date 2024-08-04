export interface DoughnutInterface {
  labels: string[];
  datasets: [
    {
      label: string;
      data: string[];
      backgroundColor: string[]
    }
  ];
  options?: any;
}
