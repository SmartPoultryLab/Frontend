/* Defines the inspection entity */
import {throwError} from "rxjs";

export interface BasicInspection {
  id:number,
  farm_id:number,
  inspection_date:Date,
  current_age:MeasuredData,
  dead_last_3_days:number,
  feed_consumption:MeasuredData,
  water_consumption:MeasuredData,
  average_weight:MeasuredData,
  other_notes:string,
  clinical_signs:string[],
  pm_lesions:string[],
  diagnoses:string[],
}

export interface Inspection extends BasicInspection{
  farm_name?:string,
  owner_name?:string,
}

export interface Unit{
  value:number,
  type:string,
  name:string,
}

export interface MeasuredData {
  value:number,
  unit:Unit
}

const WaterUnits:Unit[] = [
  {value:1,name:"Liter",type:"water"},
  {value:3.785,name:"Gallon",type:"water"},
  {value:28.31,name:"Cubic Feet",type:"water"},
]
const AgeUnits:Unit[]= [
  {value:1,name:"Day",type:"age"},
  {value:7,name:"Week",type:"age"},
  {value:30,name:"Month",type:"age"},
  {value:30*12,name:"Year",type:"age"},
]
const MassUnits:Unit[] = [
  {value:1,name:"Gram",type:"mass"},
  {value:1000,name:"Kilogram",type:"mass"},
  {value:10*1000,name:"Ton",type:"mass"},
]

const getUnit = function(unit:Unit){
  switch (unit.type){
    case "water":{return Units.water.find(xunit=>xunit.name==unit.name);}
    case "mass":{return Units.mass.find(xunit=>xunit.name==unit.name);}
    case "age":{return Units.age.find(xunit=>xunit.name==unit.name);}
  }
}

function convert(Data:MeasuredData,unit2:Unit,type:Unit[]){
    const d_ratio = type[0].value;
    let value = Data.value * d_ratio
}

/*const ConvertToUnit = function(Data:MeasuredData,unit:Unit):MeasuredData{
  if (Data.unit.type != unit.type){
    throwError("Unit's have different types")
  } else{
    switch (unit.type){
      case "water":{return convert();}
    }
  }
}*/
export const Units = {mass:MassUnits,age:AgeUnits,water:WaterUnits,getUnit:getUnit}
