"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryLink from "@/components/PrimaryLink";

export default function ReviewButton({ work }) {
  const { id, cover, title, authors } = work;
  return (
    <PrimaryLink
      href={{
        pathname: `/review/${id}`,
        query: {
          workId: id,
          cover: cover,
          title: title,
          authors: JSON.stringify(authors),
        },
      }}
    >
      Review this work.
    </PrimaryLink>
  );
}
