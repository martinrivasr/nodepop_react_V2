import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import Filters from "../components/Filters";
import Footer from "../components/footer";
import { getAdverts } from "../services/api";
import { FiltersType, Advert } from "../models/models";


const AdvertsPage = () => {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const [filters, setFilters] = useState<FiltersType>({
    tag: [],
    minPrice: "",
    maxPrice: "",
    name: "",
    sale: undefined,
  });

  const [limit, setLimit] = useState<number>(10); 
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [order, setOrder] = useState<string>("asc"); 
  const [sortField, setSortField] = useState<string>("name"); 
  const [totalRecords, setTotalRecords] = useState<number>(0); 


  useEffect(() => {
    const fetchAdverts = async () => {
      setLoading(true);
      setError("");

      try {
        const activeFilters: FiltersType = {
          ...filters,
          sale: filters.sale !== undefined ? filters.sale : undefined, 
        };
        console.log("entrado a getadverts")
        const response = await getAdverts(activeFilters);
        console.log("total Advertrs recibidos", response)
        const total = response.length;
        
        setTotalRecords(total);

        const sortedAdverts = [...response].sort((a, b) => {
          let valueA = a[sortField as keyof Advert] ?? "";
          let valueB = b[sortField as keyof Advert] ?? "";

          if (sortField === "price"){
            valueA = Number(valueA) || 0;
            valueB = Number(valueB) || 0;
            return order === "asc" ? valueA - valueB : valueB - valueA;
          }
          
          return order === "asc"
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA));
        });

        const offset = (currentPage - 1) * limit;
        const paginatedAdverts = sortedAdverts.slice(offset, offset + limit);
      
        setAdverts(paginatedAdverts);
      } catch (err) {
        console.error("Error al cargar los anuncios:", err);
        setError("Error al cargar los anuncios. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdverts();
  }, [filters, limit, currentPage, order, sortField]);


  const handleFilterChange = (newFilters: FiltersType) => {
   
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleOrderChange = (newOrder: string) => {
    console.log("Cambiando orden a:", newOrder);
    setOrder(newOrder);
    setCurrentPage(1);
  };

  const handleSortFieldChange = (field: string) => {
    console.log("Cambiando campo de orden a:", field);
    setSortField(field);
    setOrder("asc")
    setCurrentPage(1);
  };

  return (
    <section className="content d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="layout">
          <aside className="aside">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </aside>
          <main className="main">
            <div className="product-list-container">
              <Pagination
                totalRecords={totalRecords}
                limit={limit}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                onOrderChange={handleOrderChange}
                sortField={sortField}
                onSortFieldChange={handleSortFieldChange}
              />
              <h2 className="text-center">Listado de productos</h2>
              {loading && <p className="text-center">Cargando anuncios...</p>}
              {error && <p className="text-center text-danger">{error}</p>}
              <p>Ordenando por: <strong>{sortField}</strong> | Orden: <strong>{order}</strong></p>
              {!loading && !error && <ProductList adverts={adverts} />}
            </div>

          </main>
          <footer className="footer">
            <Footer />
          </footer>
        </div>
    </section>
    
  );
};

export default AdvertsPage;
