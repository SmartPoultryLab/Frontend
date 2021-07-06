/* Defines the farm entity */
export interface BaiscFarm {
  id: number;
  owner_id: number;
  bird_id: number;
  breed_id: number;
  housing_id: number;
  food_id: number;
  farm_name: string;
  num_of_breeds: number;
  start_date: string;
}
export interface Farm extends BaiscFarm{
  owner_name?:string;
  bird_name?:string;
  breed_name?:string;
  housing_name?:string;
  food_name?:string;
  num_of_visits?:number;
}
