import React from "react";
import { Advert } from "../models/models";
import { useNavigate } from "react-router-dom";
interface ProductListProps {
  adverts: Advert[];
}

const ProductList: React.FC<ProductListProps> = ({ adverts }) => {
  const navigate = useNavigate()
  
  const handleSelectProduct = (id: string) => {
    navigate(`/adverts/${id}`)
  }

  
  return (
    <section className="content">
      <div className="row">
        {adverts.map((product) => (
          <div 
            onClick={() => handleSelectProduct(product.id)} 
            className="col-12 mb-3" 
            key={product.id}
            style={{ cursor: "pointer"}}
            >
            <div className="product bg-light border rounded-3 p-3 d-flex align-items-center">
              {/* Imagen del producto */}
              <img
                src={product.photo || "/imagen.jpg"}
                alt={`Foto del producto ${product.name}`}
                className="product-image me-3"
                style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px" }}
              />

              {/* Detalles del producto */}
              <div className="product-details flex-grow-1">
                <h4 className="product-name text-primary">{product.name}</h4>
                <p className="product-owner">
                  <strong>Propietario:</strong> {product.ownerName || "N/A"}
                </p>
                <p className="product-price">
                  <strong>Precio:</strong> ${product.price}
                </p>
                <p className="product-sale">
                  <strong>Tipo:</strong> {product.sale ? "Venta" : "Compra"}
                </p>

                {/* Tags */}
                <div className="product-tags mb-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="badge bg-primary me-1">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Botón dinámico */}
                <button className={`btn ${product.sale ? "btn-success" : "btn-warning"}`}>
                  {product.sale ? "Comprar" : "Vender"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
