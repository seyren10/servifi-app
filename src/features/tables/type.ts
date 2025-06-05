export type Table = {
  _id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  activeSession?: string;
  createdAt: string;
  updatedAt: string;
};

export type TableState = {
  table: Table | null;
};

export type TableStatus = "occupied" | "available" | "reserved" | "billout";

export type TablePayload = {
  number: number;
  capacity: number;
};

export type TableBillOutParams = {
  norecord: boolean;
};
