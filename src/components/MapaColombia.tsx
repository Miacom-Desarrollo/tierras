import  { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import topo from "../assets/colombia-departments-topo.json";

import ModalInfo from "./ModalInfo";
import { Department, GeographyFeature, ModalData, Point } from "../types";

const puntos: Point[] = [
  {
    id: 1,
    name: "Juan Diaz",
    coordinates: [-74.1, 4.7],
    completeness: "muy-incompleto",
    datos: { direccion: null,telefono: null , email: null },
  },
  {
    id: 2,
    name: "Luis lopez",
    coordinates: [-75.3, 5.1],
    completeness: "incompleto",
    datos: { direccion: null, telefono: "300123", email: "x@y.com" },
  },
  {
    id: 3,
    name: "Pedro Perez",
    coordinates: [-72.5, 6.2],
    completeness: "completo",
    datos: { direccion: "Av Siempre Viva", telefono: "555", email: "otro@email.com" },
  },
];

const getColor = (status: Point["completeness"]) => {
  if (status === "completo") return "green";
  if (status === "incompleto") return "orange";
  return "red";
};

// Función auxiliar para verificar si un punto está dentro de un polígono (departamento)
const isPointInPolygon = (point: [number, number], polygon: number[][][]): boolean => {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i][0];
    const [xj, yj] = polygon[j][0];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

export default function MapaColombia() {
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const handleDepartmentClick = (geo: { properties: Department; geometry: { coordinates: number[][][] | number[][] } }) => {
    const departamento = geo.properties;
    const coords = geo.geometry.coordinates;
  
    let coordenadasDepartamento: number[][][];
  
    // Verificar si es number[][] o number[][][]
    if (Array.isArray(coords[0][0])) {
      // Es number[][][]
      coordenadasDepartamento = coords as number[][][];
    } else {
      // Es number[][]
      coordenadasDepartamento = [coords as number[][]];
    }
  
    const puntosEnDepartamento = puntos.filter((punto) =>
      isPointInPolygon(punto.coordinates, coordenadasDepartamento)
    );
  
    setModalData({ type: "department-points", data: { departamento, puntos: puntosEnDepartamento } });
  };
  
  
  const handlePointClick = (p: Point) => {
    setModalData({ type: "point", data: p });
  };

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1800, center: [-74, 4.5] }}
        style={{ width: "50vw", height: "100%" }}
      >
        <Geographies geography={topo}>
          {({ geographies }: { geographies: GeographyFeature[] }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleDepartmentClick(geo)}
                style={{
                  default: { fill: "#E0E0E0", outline: "none" },
                  hover: { fill: "#A3A3A3", outline: "none" },
                  pressed: { fill: "#636363", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {puntos.map((p) => (
          <Marker
            key={p.id}
            coordinates={p.coordinates}
            onClick={() => handlePointClick(p)}
          >
            <circle
              r={6}
              fill={getColor(p.completeness)}
              stroke="#fff"
              strokeWidth={1}
            />
          </Marker>
        ))}
      </ComposableMap>

      {modalData && (
        <ModalInfo
          isOpen={true}
          onClose={() => setModalData(null)}
          data={modalData}
        />
      )}
    </>
  );
}