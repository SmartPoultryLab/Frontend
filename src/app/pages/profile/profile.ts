/* Defines the order entity */
import { Farm } from "../farm";
import { Inspection } from "../inspection";

export interface IOrder {
  reference: string;
  amount: number;
  quantity: number;
  customerId: number;
  id: number;
  avatar: string;
  membership: boolean;
  orderDate: any;
  shippedDate: any;
  customer: Farm;
  products: Array<Inspection>;
  shipAddress: IAddress;
}

export interface IAddress {
  address: string;
  city: string;
  country: string;
  zipcode: string;
}
