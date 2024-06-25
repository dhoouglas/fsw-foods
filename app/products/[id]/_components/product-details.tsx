"use client"

import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import { formatCurrency, calculateProductTotalPrice } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image  from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true;
        }
    }>
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    
    
    return (
      <div>
        {/* TITULO E PREÇO */}
      <div className="p-5">
      {/* RESTAURANTE */}
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      {/* NOME DO PRODUTO */}
      <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

      {/* PREÇO DO PRODUTO e qauntidade */}
      <div className="flex justify-between">
        {/* PREÇO COM DESCONTOS */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {/* PREÇO ORIGINAL */}
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
    </div>

        {/* QUANTIDADE */}
        <div className="flex gap-2 items-center">
          <Button size="icon" variant="ghost" className="border border-solid border-muted-foreground">
            <ChevronLeftIcon />
          </Button>
          1
          <Button size="icon">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
      
    </div>
    )
        
}
export default ProductDetails;