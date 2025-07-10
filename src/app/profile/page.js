import Profile from "@/Components/Profile/Profile"
import { getUserData } from "@/lib/repos/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "@/Components/Auth/Logout";
import VerticalBarChart from "@/Components/Profile/VerticalChart";
import { getMealsByDate } from "@/lib/repos/meals";
import { toISODate } from "@/utils/date";

const page = async () => {
  const session = await getServerSession(authOptions);
  const userData = await getUserData(session.user.email);

  let meals = await getMealsByDate(session.user.id, toISODate(new Date()))
  let totals = meals.reduce((acc, meal) => {
    const { portion } = meal.recipes[0];
    meal.recipes.forEach(r => {
      const nutrition = r.recipe?.nutrition_info?.info;
      if (nutrition) {
        acc.calories += (nutrition.calories || 0) * portion;
        acc.carbohydrates += (nutrition.carbs || 0) * portion;
        acc.fat += (nutrition.fats || 0) * portion;
        acc.protein += (nutrition.protein || 0) * portion;
        acc.fiber += (nutrition.fiber || 0) * portion;
      }
    });
    return acc;
  }, { calories: 0, carbohydrates: 0, fat: 0, protein: 0, fiber: 0 });

  totals = { calories: 2000, carbohydrates: 180, fat: 60, protein: 85, fiber: 30 }

  return (
    <main className="pb-20 flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="title">Perfil</h1>
        <Profile userData={userData} />
      </div>
      <div className="px-4 mb-4"><Logout /></div>
      <div className="h-96">
        <VerticalBarChart consumedMacros={totals} userData={userData} />
      </div>
    </main>

  )
}

export default page