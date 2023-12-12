"use client";
import React from "react";
import { ProductInfo, ProductDetail } from "@/app/product/_sections/_index";

export default function item() {
  return (
    <>
      <main className="flex flex-col items-center">
        <ProductInfo />
        <ProductDetail />
      </main>
    </>
  );
}
