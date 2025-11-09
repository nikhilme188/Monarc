export type Role = "creator" | "brand" | "student";

export interface User {
  id: number;
  role: Role;
  name: string;
  subscribers?: number;
  category?: string;
  portfolio?: {
    title: string;
    url: string;
  }[];
  incomingOffers?: {
    brand: string;
    value: string;
  }[];
  skillScore?: number;
}