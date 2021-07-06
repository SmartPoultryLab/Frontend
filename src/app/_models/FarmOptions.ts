export interface Food {
  id:number,
  food_name:string
}
export interface Breed {
  id:number,
  bird_id:number,
  breed_name:string,
}
export interface Bird {
  id:number,
  bird_name:string
}
export interface Housing {
  id:number,
  housingName:string
}
export interface FarmOptions {
  foods:Food[],
  birds:Bird[],
  breeds:Breed[],
  housings:Housing[],
}
