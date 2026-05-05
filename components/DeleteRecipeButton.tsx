"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteRecipeButton({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("Delete this recipe?");
    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete recipe");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not delete recipe");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        padding: "0.6rem 0.9rem",
        borderRadius: "8px",
        border: "none",
        background: "#dc2626",
        color: "white",
        cursor: "pointer",
      }}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
