import React, { useState}from "react";
import { FiltersType } from "../models/models";

interface FiltersProps {
  filters: FiltersType;
  onFilterChange: (newFilters: FiltersType) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: name === "minPrice" || name === "maxPrice" ? (value ? Number(value) : "") : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(localFilters);
     
  };

  const handleResetFilters = () =>{
    const defaultFilters: FiltersType ={
      tag:[],
      minPrice:"",
      maxPrice:"",
      name:"",
      sale:undefined,
    }
      setLocalFilters(defaultFilters)
      onFilterChange(defaultFilters)
  }

  return (
    <aside className="filters bg-light border rounded p-3">
      <h2>Search</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <select
              id="tag"
              name="tag"
              className="form-select"
              multiple
              value={filters.tag}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  tag: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
            >

            <option value="work">Work</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="motor">Motor</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="minPrice" className="form-label">
            Precio mínimo:
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            className="form-control"
            placeholder="Precio mínimo"
            value={localFilters.minPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maxPrice" className="form-label">
            Precio máximo:
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            className="form-control"
            placeholder="Precio máximo"
            value={localFilters.maxPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre del producto:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Nombre del producto"
            value={localFilters.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
            <div className="mb-3">
                <label>
                    <input 
                    type="radio"
                    name="sale" 
                    value="true"
                    checked={localFilters.sale === true}
                    onChange={() => setLocalFilters({ ...localFilters, sale: true })}
                    
                    />
                    Compra
                </label>
                <label className="form-label mx-3">
                    <input 
                    type="radio" 
                    name="sale"
                    value="false"
                    checked={localFilters.sale === false}
                    onChange={() => setLocalFilters({ ...localFilters, sale:  false })}
                    />
                    Venta
                </label>
            </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Aplicar filtros
        </button>
        <button
            type="button"
            className="btn btn-secondary w100 mt-2"
            onClick={handleResetFilters}
            >
              Limpiar Filtros
            </button>
      </form>
    </aside>
  );
};

export default Filters;
