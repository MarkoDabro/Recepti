"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Recipe = {
  id: string;
  title: string;
  description: string | null;
  ingredients: string;
  instructions: string;
  imageUrl: string | null;
};

type Props = {
  recipe: Recipe;
};

export default function EditRecipeForm({ recipe }: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description || "");
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/recipes/${recipe.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          ingredients,
          instructions,
          imageUrl,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update recipe");
      }

      setIsOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "0.6rem 0.9rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer",
        }}
      >
        Edit
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "0.75rem",
        marginTop: "1rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={{
          padding: "0.75rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        style={{
          padding: "0.75rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients"
        required
        rows={4}
        style={{
          padding: "0.75rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
        required
        rows={5}
        style={{
          padding: "0.75rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        style={{
          padding: "0.75rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.6rem 0.9rem",
            borderRadius: "8px",
            border: "none",
            background: "black",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          style={{
            padding: "0.6rem 0.9rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
