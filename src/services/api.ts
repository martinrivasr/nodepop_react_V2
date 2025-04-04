import { api, setAuthorizationHeader, removeAuthorizationheader } from './connection.ts'
import { SignupDto, CreateAdvertDto, Advert, Tag, Credentials, Login  } from "../models/models.ts"
import storage from '../utils/storage.ts';



export const login = async (credentials: Credentials, rememberMe:boolean) => {
  try {
    const baseURL =  import.meta.env.VITE_API_BASE_URL
    console.log(baseURL, "/auth/login" )
      const response = await api.post<Login>("/auth/login", credentials);

      const { accessToken } = response.data;
      storage.set("auth", accessToken);
      setAuthorizationHeader(accessToken);
  } catch (error) {
      console.error("Error en login:", error);
      throw error; 
  }
};


  
  // Deslogear a un usuario
export const logout = async (rememberMe:boolean) => {
 
  if(!rememberMe){

    storage.remove("auth");
  }
  removeAuthorizationheader();
};


  // Generar un usuario
export const signup = async (data: SignupDto): Promise<void> => {
    await api.post("/auth/signup", data);
  };

  // Obtener información del usuario autenticado
export const getUserInfo = async (): Promise<void> => {
    await api.get("/auth/me");
  };
  
  // Obtener tags disponibles
  export const getTags = async (): Promise<Tag[]> => {
    const response = await api.get<Tag[]>("/v1/adverts/tags");
    return response.data;
  };
  
 // Crear un anuncio
export const createAdvert = async (data: CreateAdvertDto): Promise<Advert> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("sale", data.sale.toString());
    formData.append("price", data.price.toString());
    data.tags.forEach((tag) => formData.append("tags", tag))
    if (data.photo) {
      formData.append("photo", data.photo);
    }
  
    const response = await api.post<Advert>("/v1/adverts", formData);
    return response.data;
  };

  // Eliminar un anuncio
  export const deleteAdvert = async (id: string): Promise<void> => {
    await api.delete(`/v1/adverts/${id}`);
  };
  
  
  export const getAdverts = async (): Promise<Advert[]> => {
    try {
    
      const response = await api.get<Advert[]>("/v1/adverts");
      return response.data;
    } catch (error) {
      console.log("Error en getadverts:", error)
      throw error
    }

  };


  export const getAdvertById = async (id: string): Promise<Advert> =>{
    const response = await api.get<Advert>(`/v1/adverts/${id}`)
    return response.data;
  }
