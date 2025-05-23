export type Table = {
  _id: string;
  number: number;
  capacity: number;
  status: "occupied" | "available" | "reserved";
  createdAt: string;
  updatedAt: string;
};

export type TableState = {
  table: Table | null;
};
