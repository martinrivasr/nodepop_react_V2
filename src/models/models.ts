//modelo para las credenciales

export interface Credentials {
  email: string;
  password: string;
}

//modelo para el token

export interface Login{
  accessToken: string;
}

// Modelo para SignupDto
export interface SignupDto {
    email: string;
    password: string;
    username: string;
    name: string;
  }
  
  // Modelo para LoginDto
  export interface LoginDto {
    email: string;
    password: string;
  }
  
  // Modelo para CreateAdvertDto
  export interface CreateAdvertDto {
    name: string;
    sale: boolean;
    price: number;
    tags: string[];
    photo?: File | null; 
  }
  
  // Modelo para el esquema de tags
  export type Tag = "lifestyle" | "mobile" | "motor" | "work";
  
  // Respuesta para Advert
  export interface Advert {
    id: string;
    name: string;
    owner?: string;
    ownerName?: string; 
    sale: boolean;
    price: number;
    tags: Tag[];
    photo?: string;
  }

  //Modelo para los filtros
  export interface FiltersType {
    tag: string [];
    minPrice?: string;
    maxPrice?: string;
    name?: string;
    sale?: boolean;
  }
  
  //modelo de adverts response
  export interface AdvertsResponse {
    adverts: Advert[]; 
    total?: number; 
  }