function sumRecipeNutrition(recipe) {
  let sum = { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
  if (recipe.nutrition_info) {
    Object.assign(sum, recipe.nutrition_info)
  } else {
    for (const ri of recipe.ingredients) {
      const n = ri.ingredient.nutrition_info
      if (n) {
        sum.calories += n.calories || 0
        sum.protein += n.protein || 0
        sum.carbs += n.carbs || 0
        sum.fats += n.fats || 0
        sum.fiber += n.fiber || 0
      }
    }
  }
  return sum
}

export default sumRecipeNutrition