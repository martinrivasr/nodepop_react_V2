import React, { useState } from "react";

interface PaginationProps {
  totalRecords: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onLimitChange: (newLimit: number) => void;
  onOrderChange: (order: string) => void;
  sortField: string;
  onSortFieldChange: (field: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecords,
  limit,
  currentPage,
  onPageChange,
  onLimitChange,
  onOrderChange,
  sortField,
  onSortFieldChange,
}) => {
  const totalPages = Math.ceil(totalRecords / limit);
  const [pageBatch, setPageBatch] = useState(0); 

  const maxVisiblePages = 10; 
  const startPage = pageBatch * maxVisiblePages + 1; 
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages); 

  const handlePageChange = (page: number) => {
    console.log("pagina actual : ", page)
    console.log("total paginas :" , totalPages)
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
      console.log("onPageChange :" , page)
      const newBatch = Math.floor((page - 1) / maxVisiblePages); 
      
      if (newBatch !== pageBatch) {
        setPageBatch(newBatch);
      }
    }
  };


  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-2 mb-3 bg-body-tertiary px-3 py-2">
      <div className="d-flex align-items-center gap-3">
        <select
          className="form-select text-primary"
          style={{ minWidth: "200px" }}
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          <option value="10">10 registros</option>
          <option value="20">20 registros</option>
          <option value="50">50 registros</option>
        </select>

        <select
          className="form-select text-primary"
          style={{ minWidth: "150px" }}
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value)}
        >
          <option value="">Ordenar por</option>
          <option value="name">Nombre</option>
          <option value="price">Precio</option>
          <option value="owner">Propietario</option>
        </select>

        <i
          className="bi bi-sort-up fs-4"
          style={{ cursor: "pointer" }}
          title="Orden ascendente"
          onClick={() => onOrderChange("asc")}
        ></i>
        <i
          className="bi bi-sort-down fs-4"
          style={{ cursor: "pointer" }}
          title="Orden descendente"
          onClick={() => onOrderChange("desc")}
        ></i>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="text-muted">Total registros: {totalRecords}</span>
        <nav aria-label="Page navigation">
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link text-secondary"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Anterior
                &laquo;
              </button>
            </li>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const page = startPage + i;
              return (
                <li
                  key={page}
                  className={`page-item ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link text-primary"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link text-secondary"
                onClick={() => handlePageChange(currentPage + 1 )}
              >
                siguiente
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
        <span className="text-muted">Total páginas: {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
