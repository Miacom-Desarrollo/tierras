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
// Componente Header
const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mapa de Tierras</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:underline">Inicio</a></li>
            <li><a href="#" className="hover:underline">Departamentos</a></li>
            <li><a href="#" className="hover:underline">Acerca de</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Componente Footer
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Mapa de Tierras- Todos los derechos reservados</p>
        <div className="mt-2">
          <a href="#" className="text-blue-300 hover:underline mx-2">Términos</a>
          <a href="#" className="text-blue-300 hover:underline mx-2">Privacidad</a>
          <a href="#" className="text-blue-300 hover:underline mx-2">Contacto</a>
        </div>
      </div>
    </footer>
  );
};
const puntos: Point[] = [
  { id: 1, name: "Juan Diaz", coordinates: [-74.1, 4.7], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 2, name: "Luis Lopez", coordinates: [-75.3, 5.1], completeness: "incompleto", datos: { direccion: null, telefono: "300123", email: "x@y.com" } },
  { id: 3, name: "Pedro Perez", coordinates: [-72.5, 6.2], completeness: "completo", datos: { direccion: "Av Siempre Viva", telefono: "555", email: "otro@email.com" } },
  { id: 4, name: "Maria Torres", coordinates: [-73.6, 4.1], completeness: "completo", datos: { direccion: "Calle 123", telefono: "311456", email: "maria@correo.com" } },
  { id: 5, name: "Carlos Gomez", coordinates: [-75.5, 6.3], completeness: "incompleto", datos: { direccion: "Cra 45", telefono: null, email: "cgomez@mail.com" } },
  { id: 6, name: "Ana Sanchez", coordinates: [-76.5, 3.4], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 7, name: "Diego Rojas", coordinates: [-74.8, 10.9], completeness: "completo", datos: { direccion: "Barrio Norte", telefono: "310999", email: "drojas@dominio.com" } },
  { id: 8, name: "Luisa Herrera", coordinates: [-75.6, 5.0], completeness: "incompleto", datos: { direccion: null, telefono: "300000", email: null } },
  { id: 9, name: "Andres Medina", coordinates: [-77.3, 3.8], completeness: "completo", datos: { direccion: "Zona Rural", telefono: "315123", email: "amedina@correo.com" } },
  { id: 10, name: "Laura Ortiz", coordinates: [-73.3, 5.8], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 11, name: "Miguel Castro", coordinates: [-75.4, 8.7], completeness: "incompleto", datos: { direccion: "Calle 5", telefono: null, email: "miguel@correo.com" } },
  { id: 12, name: "Natalia Gil", coordinates: [-74.0, 4.3], completeness: "completo", datos: { direccion: "Carrera 9", telefono: "312456", email: "natalia@dominio.com" } },
  { id: 13, name: "Sebastian Acosta", coordinates: [-71.8, 1.2], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 14, name: "Juliana Ruiz", coordinates: [-75.9, 8.8], completeness: "completo", datos: { direccion: "Av Libertador", telefono: "320789", email: "jruiz@correo.com" } },
  { id: 15, name: "Oscar Ramirez", coordinates: [-76.3, 3.5], completeness: "incompleto", datos: { direccion: "Centro", telefono: null, email: "oscar@dominio.com" } },
  { id: 16, name: "Sofia Vargas", coordinates: [-75.5, 9.3], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 17, name: "Esteban Peña", coordinates: [-72.7, 7.1], completeness: "completo", datos: { direccion: "Barrio El Lago", telefono: "311222", email: "esteban@correo.com" } },
  { id: 18, name: "Daniela Cifuentes", coordinates: [-76.7, 3.2], completeness: "incompleto", datos: { direccion: "San Fernando", telefono: null, email: "dcifuentes@dominio.com" } },
  { id: 19, name: "Felipe Martinez", coordinates: [-74.5, 4.5], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 20, name: "Camila Torres", coordinates: [-75.7, 6.1], completeness: "completo", datos: { direccion: "Las Palmas", telefono: "313456", email: "camila@correo.com" } },
  { id: 21, name: "Jorge Castillo", coordinates: [-77.2, 5.5], completeness: "incompleto", datos: { direccion: "El Centro", telefono: null, email: "jorge@dominio.com" } },
  { id: 22, name: "Isabela Nieto", coordinates: [-75.0, 8.4], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 23, name: "Mauricio Salazar", coordinates: [-74.3, 4.2], completeness: "completo", datos: { direccion: "Suba", telefono: "320123", email: "msalazar@correo.com" } },
  { id: 24, name: "Paula Garcia", coordinates: [-73.7, 9.3], completeness: "incompleto", datos: { direccion: null, telefono: "321321", email: null } },
  { id: 25, name: "Ricardo Mendoza", coordinates: [-75.2, 7.1], completeness: "completo", datos: { direccion: "Centro", telefono: "311000", email: "rmendoza@correo.com" } },
  { id: 26, name: "Lorena Diaz", coordinates: [-76.1, 3.6], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 27, name: "Cristian Becerra", coordinates: [-73.1, 5.6], completeness: "completo", datos: { direccion: "La Floresta", telefono: "310321", email: "cbecerra@correo.com" } },
  { id: 28, name: "Melissa Suarez", coordinates: [-75.8, 7.9], completeness: "incompleto", datos: { direccion: null, telefono: "300456", email: null } },
  { id: 29, name: "Andres Bonilla", coordinates: [-77.0, 3.4], completeness: "completo", datos: { direccion: "Barrio Centro", telefono: "311987", email: "abonilla@dominio.com" } },
  { id: 30, name: "Karla Rojas", coordinates: [-74.9, 10.4], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 31, name: "Ivan Calderon", coordinates: [-76.4, 4.1], completeness: "incompleto", datos: { direccion: null, telefono: "313313", email: "icalderon@correo.com" } },
  { id: 32, name: "Diana Navarro", coordinates: [-72.9, 7.8], completeness: "completo", datos: { direccion: "Calle 14", telefono: "320111", email: "dnavarro@correo.com" } },
  { id: 33, name: "Martin Gil", coordinates: [-75.6, 9.1], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 34, name: "Valentina Bernal", coordinates: [-73.5, 4.9], completeness: "completo", datos: { direccion: "Cra 7", telefono: "300654", email: "vbernal@correo.com" } },
  { id: 35, name: "Jose Silva", coordinates: [-76.2, 3.3], completeness: "incompleto", datos: { direccion: null, telefono: "314314", email: null } },
  { id: 36, name: "Liliana Pardo", coordinates: [-74.2, 4.4], completeness: "completo", datos: { direccion: "Chapinero", telefono: "316789", email: "lpardo@correo.com" } },
  { id: 37, name: "Pablo Mejia", coordinates: [-74.7, 10.5], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 38, name: "Andrea Rincón", coordinates: [-75.1, 5.2], completeness: "completo", datos: { direccion: "Santa Ana", telefono: "310001", email: "arincon@dominio.com" } },
  { id: 39, name: "Camilo Avila", coordinates: [-77.1, 3.7], completeness: "incompleto", datos: { direccion: null, telefono: "300222", email: null } },
  { id: 40, name: "Luisa Mendez", coordinates: [-73.8, 8.1], completeness: "completo", datos: { direccion: "La Candelaria", telefono: "310101", email: "lmendez@correo.com" } },
  { id: 41, name: "Hector Cardenas", coordinates: [-74.1, 4.8], completeness: "incompleto", datos: { direccion: "Calle 11", telefono: "300111", email: null } },
  { id: 42, name: "Claudia Prieto", coordinates: [-75.4, 6.2], completeness: "completo", datos: { direccion: "El Retiro", telefono: "310222", email: "cprieto@dominio.com" } },
  { id: 43, name: "Manuel Zambrano", coordinates: [-74.5, 5.3], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 44, name: "Vanessa Castaño", coordinates: [-76.8, 3.0], completeness: "completo", datos: { direccion: "Ciudad Jardin", telefono: "311654", email: "vcastano@correo.com" } },
  { id: 45, name: "Santiago Palacio", coordinates: [-75.3, 6.5], completeness: "incompleto", datos: { direccion: null, telefono: "310333", email: null } },
  { id: 46, name: "Tatiana Muñoz", coordinates: [-74.6, 4.6], completeness: "completo", datos: { direccion: "Normandia", telefono: "313999", email: "tmunoz@correo.com" } },
  { id: 47, name: "Alejandro Rios", coordinates: [-75.9, 8.5], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
  { id: 48, name: "Daniel Vargas", coordinates: [-72.6, 6.9], completeness: "completo", datos: { direccion: "La Esperanza", telefono: "321654", email: "dvargas@correo.com" } },
  { id: 49, name: "Veronica Reyes", coordinates: [-73.4, 5.4], completeness: "incompleto", datos: { direccion: null, telefono: "310444", email: null } },
  { id: 50, name: "Sergio Gonzalez", coordinates: [-75.7, 7.2], completeness: "completo", datos: { direccion: "El Prado", telefono: "314314", email: "sgonzalez@dominio.com" } },
    { id: 51, name: "Ana Morales", coordinates: [-70.0, -3.8], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
    { id: 52, name: "Carlos Peña", coordinates: [-69.9, -4.0], completeness: "incompleto", datos: { direccion: null, telefono: "311222333", email: "carlos@example.com" } },
    { id: 53, name: "Laura Gómez", coordinates: [-70.2, -3.6], completeness: "completo", datos: { direccion: "Calle 1 #2-3", telefono: "310444555", email: "laura@example.com" } },
    { id: 54, name: "Miguel Torres", coordinates: [-70.5, -1.2], completeness: "completo", datos: { direccion: "Carrera 4 #5-6", telefono: "320555666", email: "miguel@example.com" } },
    { id: 55, name: "Sandra Ruiz", coordinates: [-69.7, -3.7], completeness: "incompleto", datos: { direccion: null, telefono: "300777888", email: "sandra@example.com" } },
    
    { id: 56, name: "Javier Cárdenas", coordinates: [-77.3, 1.2], completeness: "completo", datos: { direccion: "Av Sur #8-9", telefono: "320111222", email: "javier@example.com" } },
    { id: 57, name: "Mónica Beltrán", coordinates: [-77.2, 1.3], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
    { id: 58, name: "David Ortiz", coordinates: [-77.4, 1.1], completeness: "incompleto", datos: { direccion: null, telefono: "311333444", email: "david@example.com" } },
    { id: 59, name: "Paula Mendoza", coordinates: [-77.5, 1.0], completeness: "completo", datos: { direccion: "Calle 10 #11-12", telefono: "312555666", email: "paula@example.com" } },
    { id: 60, name: "Andrés Salgado", coordinates: [-77.1, 1.4], completeness: "completo", datos: { direccion: "Cra 12 #13-14", telefono: "310777888", email: "andres@example.com" } },
    
    { id: 61, name: "Lucía Rojas", coordinates: [-76.5, 0.5], completeness: "incompleto", datos: { direccion: null, telefono: "300999111", email: "lucia@example.com" } },
    { id: 62, name: "Oscar Vega", coordinates: [-76.7, 0.7], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
    { id: 63, name: "Tatiana Naranjo", coordinates: [-75.9, 0.3], completeness: "completo", datos: { direccion: "Diagonal 1 #2-3", telefono: "311111222", email: "tatiana@example.com" } },
    { id: 64, name: "Camilo Barrios", coordinates: [-76.8, 0.8], completeness: "incompleto", datos: { direccion: null, telefono: "310333444", email: "camilo@example.com" } },
    { id: 65, name: "Lorena Castillo", coordinates: [-76.2, 0.2], completeness: "completo", datos: { direccion: "Av Central #4-5", telefono: "312666777", email: "lorena@example.com" } },
    
    { id: 66, name: "Sebastián Pardo", coordinates: [-71.0, -1.5], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
    { id: 67, name: "Natalia Arias", coordinates: [-71.2, -1.7], completeness: "incompleto", datos: { direccion: null, telefono: "312000111", email: "natalia@example.com" } },
    { id: 68, name: "Felipe Navarro", coordinates: [-70.8, -1.9], completeness: "completo", datos: { direccion: "Carrera 2 #3-4", telefono: "320888999", email: "felipe@example.com" } },
    { id: 69, name: "Mariana Castro", coordinates: [-70.5, -1.1], completeness: "completo", datos: { direccion: "Calle 5 #6-7", telefono: "300444555", email: "mariana@example.com" } },
    { id: 70, name: "Ricardo Ayala", coordinates: [-70.9, -0.8], completeness: "incompleto", datos: { direccion: null, telefono: "311666777", email: "ricardo@example.com" } },

      // Guaviare
      { id: 71, name: "Daniel Ríos", coordinates: [-72.6, 2.5], completeness: "completo", datos: { direccion: "Calle 10 #5-2", telefono: "310123456", email: "daniel@example.com" } },
      { id: 72, name: "Sara Benítez", coordinates: [-72.8, 2.7], completeness: "incompleto", datos: { direccion: null, telefono: "311654987", email: "sara@example.com" } },
      { id: 73, name: "Julio Contreras", coordinates: [-72.7, 2.4], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
      { id: 74, name: "Isabel Méndez", coordinates: [-72.5, 2.6], completeness: "completo", datos: { direccion: "Av Libertador #8-9", telefono: "300789654", email: "isabel@example.com" } },
      { id: 75, name: "Rodrigo Salinas", coordinates: [-72.9, 2.3], completeness: "incompleto", datos: { direccion: null, telefono: "312789654", email: "rodrigo@example.com" } },
    
      // Arauca
      { id: 76, name: "Claudia Vargas", coordinates: [-68.7,3.1], completeness: "completo", datos: { direccion: "Carrera 3 #2-1", telefono: "313456789", email: "claudia@example.com" } },
      { id: 77, name: "Oscar Niño", coordinates: [-71.0, 6.8], completeness: "incompleto", datos: { direccion: null, telefono: "310555333", email: "oscar@example.com" } },
      { id: 78, name: "Mariana Silva", coordinates: [-70.9, 3.2], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
      { id: 79, name: "Carlos León", coordinates: [-70.8, 5.0], completeness: "completo", datos: { direccion: "Calle 7 #8-9", telefono: "320999888", email: "carlos@example.com" } },
      { id: 80, name: "Laura Castillo", coordinates: [-70.6, 4.3], completeness: "incompleto", datos: { direccion: null, telefono: "314567321", email: "laura@example.com" } },
    
      // Caquetá
      { id: 81, name: "Tomás Parra", coordinates: [-75.6, 1.6], completeness: "completo", datos: { direccion: "Cra 6 #7-8", telefono: "315234567", email: "tomas@example.com" } },
      { id: 82, name: "Daniela Lozano", coordinates: [-75.8, 1.8], completeness: "incompleto", datos: { direccion: null, telefono: "310222333", email: "daniela@example.com" } },
      { id: 83, name: "Samuel Rincón", coordinates: [-75.7, 1.5], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
      { id: 84, name: "Patricia Barrera", coordinates: [-75.9, 1.7], completeness: "completo", datos: { direccion: "Av 9 #10-11", telefono: "311777888", email: "patricia@example.com" } },
      { id: 85, name: "Jhon Muñoz", coordinates: [-75.5, 1.9], completeness: "incompleto", datos: { direccion: null, telefono: "312666555", email: "jhon@example.com" } },
    
      // Vaupés
      { id: 86, name: "Gabriela Zamora", coordinates: [-70.5, 1.1], completeness: "completo", datos: { direccion: "Calle 2 #1-1", telefono: "313222444", email: "gabriela@example.com" } },
      { id: 87, name: "Esteban Molina", coordinates: [-70.3, 1.3], completeness: "incompleto", datos: { direccion: null, telefono: "310111555", email: "esteban@example.com" } },
      { id: 88, name: "Camila Duarte", coordinates: [-70.4, 1.2], completeness: "muy-incompleto", datos: { direccion: null, telefono: null, email: null } },
      { id: 89, name: "Héctor Pineda", coordinates: [-70.6, 1.4], completeness: "completo", datos: { direccion: "Cra 1 #3-5", telefono: "320333222", email: "hector@example.com" } },
      { id: 90, name: "Melisa Franco", coordinates: [-70.7, 1.0], completeness: "incompleto", datos: { direccion: null, telefono: "312888999", email: "melisa@example.com" } },

    
  
];


const getColor = (status: Point["completeness"]) => {
  if (status === "completo") return "green";
  if (status === "incompleto") return "orange";
  return "red";
};


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
        <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto p-4 flex items-center justify-center">
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
      </main>
      
      <Footer />
    </div>
    </>
  );
}