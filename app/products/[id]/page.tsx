import { formatCurrency } from '@/app/_helpers/price'
import { db } from '@/app/_lib/prisma'
import { ArrowDownIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ProductImage from './_components/product-image'

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <div>
      {/* IMAGE */}
      <ProductImage product={product} />

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
          {/* PREÇO */}
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">
              {formatCurrency(Number(product.price))}
            </h2>
            {product.discountPercentage > 0 && (
              <div className="flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
                <ArrowDownIcon size={12} />
                <span className="text-xs font-semibold">
                  {product.discountPercentage}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
