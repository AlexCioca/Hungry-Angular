export interface IRecipe{
  recipeId:number;
  name:string;
  description:string;
  mainPhoto:string;
  userId:number;
  createdDate:Date;
  difficulty:string;
  preparationTime:number;
  serves:number;
  isDeleted:boolean;
}
