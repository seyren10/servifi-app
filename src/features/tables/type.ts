export type Table = {
  _id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  createdAt: string;
  updatedAt: string;
};

export type TableState = {
  table: Table | null;
};

export type TableStatus = "occupied" | "available" | "reserved";
