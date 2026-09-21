import { Link } from "react-router-dom";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} className="group">
      <div className="overflow-hidden rounded-xl border">
        <img
          src={image}
          alt={name}
          className="h-64 w-full object-cover transition group-hover:scale-105"
        />

        <div className="p-4">
          <h3 className="font-semibold">{name}</h3>

          <p className="mt-2 text-lg font-bold">
            €{price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;