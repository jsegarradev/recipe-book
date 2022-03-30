import {Difficulty} from "@/model/Difficulty";

export interface Recipe {
    id: number,
    title: string,
    imageUrl: string,
    servings: number,
    time: string,
    difficulty: Difficulty
    ingredients: string[],
    directions: string[],
    featured?: boolean       //Optional
}