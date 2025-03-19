import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import Filters from "../components/Filters";
import Footer from "../components/footer";
import { FiltersType, Advert } from "../models/models";
import { useFilteredAdverts } from "../hooks/useFilteredAdverts";
import { useAppDispatch, useAppSelector } from "../store";
import { advertsLoaded } from "../store/actions";
import { getadvertsSelector, getIslogged, getUi } from "../store/selectors";
import Message from "../components/message";


const AdvertsPage = () => {
  const [allAdverts, setAllAdverts ] = useState<Advert[]>([]);
  const { isLogged, } = useAppSelector(getIslogged);
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
  const {pending, message} = useAppSelector(getUi)
  
  
  const adverts = useAppSelector(getadvertsSelector);
 
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    dispatch(advertsLoaded());
}, [dispatch]); 

useEffect(() => {
    setAllAdverts(adverts);
    
}, [adverts]); 


  const { filteredAdverts, totalRecords  } = useFilteredAdverts(
    allAdverts, filters, limit, currentPage, order, sortField
  );
  
    const handleFilterChange = (newFilters: FiltersType) => {
      setFilters((prevFilters) => {
        const updatedFilters = {
          ...prevFilters,
          ...newFilters,
        };
        return updatedFilters;
      });
    
      setCurrentPage(1);
    };
    
    
  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleOrderChange = (newOrder: string) => {
    setOrder(newOrder);
    setCurrentPage(1);
  };

  const handleSortFieldChange = (field: string) => {
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
              {message && <Message type={message.type} text={message.text} />}
              {message?.text && <p className="text-center text-danger">{message.text}</p>}
              <p>Ordenando por: <strong>{sortField}</strong> | Orden: <strong>{order}</strong></p>
              {isLogged && <ProductList adverts={filteredAdverts} />}
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
