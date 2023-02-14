import { Recipe } from "../interfaces/recipe.interface";

// url works only if json server is live
// const url = 'http://10.0.2.2:3000'; // android?
const url = 'http://localhost:3000';

export async function getAllRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${url}/recipes`);
  if (response.status < 400) {
    return await response.json();
  } else {
    throw new Error(String(response.status));
  }
}

export async function addRecipe(inputData: Recipe): Promise<void> {
  const response = await fetch(`${url}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  });
  if (response.status < 400) {
    return await response.json();
  } else {
    throw new Error(String(response.status));
  }
}

export async function getFavouriteRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${url}/recipes?isFavourite=true`);
  if (response.status < 400) {
    return await response.json();
  } else {
    throw new Error(String(response.status));
  }
}

// does thsi return void?
export async function editRecipe(inputData: Recipe, id: number): Promise<void> {
  const response = await fetch(`${url}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  });
  if (response.status < 400) {
    return await response.json();
  } else {
    throw new Error(String(response.status));
  }
}
