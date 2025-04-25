export interface Point {
    id: number;
    name: string;
    coordinates: [number, number];
    completeness: "completo" | "incompleto" | "muy-incompleto";
    datos: Record<string, string | null>;
  }
  
  export interface Department {
    CD_DPTO: string;
    NOMBRE_DPT: string;
    poblacion?: number;
    puntos_totales?: number;
    puntos_completos?: number;
    puntos_incompletos?: number;
  }
  
  export type ModalData =
    | { type: "point"; data: Point }
    | { type: "department"; data: Department };
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