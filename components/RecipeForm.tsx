"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecipeForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
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

      const text = await res.text();
      let data;

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(text || "Server did not return valid JSON");
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to create recipe");
      }

      setTitle("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setImageUrl("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "1rem",
        marginBottom: "2rem",
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: "12px",
      }}
    >
      <h2>Add Recipe</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <textarea
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
        rows={4}
        style={{
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
        rows={5}
        style={{
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "0.85rem 1rem",
          borderRadius: "8px",
          border: "none",
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Saving..." : "Add Recipe"}
      </button>
    </form>
  );
}
