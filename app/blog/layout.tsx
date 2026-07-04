import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Inseong",
  description:
    "Notes on learning and research — a personal growth log of technical depth."
};

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
