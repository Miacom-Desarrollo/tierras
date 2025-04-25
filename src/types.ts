export interface Point {
    id: number;
    name: string;
    coordinates: [number, number];
    completeness: "completo" | "incompleto" | "muy-incompleto";
    datos: Record<string, string | null>;
  }
  
  export interface Department {
    divipola_n?: number;
    name?: string;
    CD_DPTO: string;
    NOMBRE_DPT: string;
    poblacion?: number;
    puntos_totales?: number;
    puntos_completos?: number;
    puntos_incompletos?: number;
  }
  
  export type ModalData =
  | { type: "point"; data: Point }
  | { type: "department"; data: Department }
  | { type: "department-points"; data: { departamento: Department; puntos: Point[] } }; 

   export type GeographyFeature = {
    rsmKey: any;
    type: string;
    properties: {
      CD_DPTO: string;
      NOMBRE_DPT: string;
      poblacion?: number;
      puntos_totales?: number;
      puntos_completos?: number;
      puntos_incompletos?: number;
    };
    geometry: {
      type: string;
      coordinates: number[][];
    };
   }