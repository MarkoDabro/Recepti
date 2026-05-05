import { prisma } from "@/lib/prisma";
import RecipeForm from "@/components/RecipeForm";
import EditRecipeForm from "@/components/EditRecipeForm";
import DeleteRecipeButton from "@/components/DeleteRecipeButton";

type Recipe = {
  id: string;
  title: string;
  description: string | null;
  ingredients: string;
  instructions: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default async function HomePage() {
  const recipes: Recipe[] = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Recipes App
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
          Manage your recipes
        </h1>
        <p className="mt-3 max-w-2xl text-base text-zinc-600">
          Add, update, and remove recipes from one clean dashboard.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <RecipeForm />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900">Recipes</h2>
            <span className="text-sm text-zinc-500">
              {recipes.length} total
            </span>
          </div>

          {recipes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
              <p className="text-zinc-600">
                No recipes yet. Add your first one.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-zinc-900">
                          {recipe.title}
                        </h3>
                        {recipe.description && (
                          <p className="mt-1 text-sm text-zinc-600">
                            {recipe.description}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <EditRecipeForm recipe={recipe} />
                        <DeleteRecipeButton id={recipe.id} />
                      </div>
                    </div>

                    {recipe.imageUrl && (
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="h-56 w-full rounded-xl object-cover"
                      />
                    )}

                    <div className="grid gap-3 text-sm text-zinc-700">
                      <p>
                        <span className="font-medium text-zinc-900">
                          Ingredients:
                        </span>{" "}
                        {recipe.ingredients}
                      </p>
                      <p>
                        <span className="font-medium text-zinc-900">
                          Instructions:
                        </span>{" "}
                        {recipe.instructions}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
