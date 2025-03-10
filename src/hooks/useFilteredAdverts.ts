import { useState, useEffect } from "react";
import { FiltersType, Advert } from "../models/models";

export const useFilteredAdverts = (
  allAdverts: Advert[],
  filters: FiltersType,
  limit: number,
  currentPage: number,
  order: string,
  sortField: string
) => {
  const [filteredAdverts, setFilteredAdverts] = useState<Advert[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    let filtered = [...allAdverts];

    if (filters.name) {
      filtered = filtered.filter(advert =>
        advert.name.toLowerCase().includes(filters.name?.toLowerCase() ?? "")
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(advert => advert.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(advert => advert.price <= Number(filters.maxPrice));
    }

    if (filters.sale !== undefined) {
      filtered = filtered.filter(advert => advert.sale === filters.sale);
    }

    if ((filters.tag ?? []).length > 0) {
      filtered = filtered.filter(advert =>
        (filters.tag ?? []).some((tag: string) => advert.tags.includes(tag))
      );
    }

    setTotalRecords(filtered.length);

    // Aplicar ordenación
    filtered.sort((a, b) => {
      let valueA = a[sortField as keyof Advert] ?? "";
      let valueB = b[sortField as keyof Advert] ?? "";

      if (sortField === "price") {
        return order === "asc" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
      }
      return order === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

    // Aplicar paginación
    const offset = (currentPage - 1) * limit;
    setFilteredAdverts(filtered.slice(offset, offset + limit));

  }, [filters, allAdverts, limit, currentPage, order, sortField]);

  return { filteredAdverts, totalRecords };
};
