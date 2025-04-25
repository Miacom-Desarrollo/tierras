
import React from "react";
import { ModalData, Point } from "../types";

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}
const DEPARTAMENTOS: Record<string, string> = {
  "11": "Bogotá D.C.",
  "05": "Antioquia",
  "08": "Atlántico",
  "13": "Bolívar",
  "15": "Boyacá",
  "17": "Caldas",
  "18": "Caqueta",
  "19": "Casanare",
  "20": "Cauca",
  "23": "Cesar",
  "25": "Cundinamarca",
  "27": "Choco",
  "41": "Huila",
  "44": "La Guajira",
  "47": "Magdalena",
  "50": "Meta",
  "52": "Norte de Santander",
  "54": "Quindío",
  "63": "Risaralda",
  "66": "Santander",
  "68": "Sucre",
  "70": "Tolima",
  "73": "Valle del Cauca",
  "76": "Vaupe",
  "81": "Vichada",
  "88": "San Andrés, Providencia y Santa Catalina",
  "91": "Amazonas",
  "94": "Guainía",
  "95": "Guaviare",
  "97": "Vargas",
  "99": "Arauca",



};

const getColor = (status: Point["completeness"]) => {
  if (status === "completo") return "bg-green-200";
  if (status === "incompleto") return "bg-orange-200";
  return "bg-red-200";
};

const ModalInfo: React.FC<ModalInfoProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) {
    return null;
  }

  if (data.type === "point") {
    const pointData = data.data as Point;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
     <div className={` p-6 rounded-md ${getColor(pointData.completeness)}`}>
          <h2 className="text-lg font-bold mb-2">{pointData.name}</h2>
          {pointData.datos && (
            <div>
              <p>Dirección: {pointData.datos.direccion || "N/A"}</p>
              <p>Teléfono: {pointData.datos.telefono || "N/A"}</p>
              <p>Email: {pointData.datos.email || "N/A"}</p>
            </div>
          )}
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded-md">Cerrar</button>
        </div>
      </div>
    );
  }

  if (data.type === "department-points") {
    console.log("data",data.data);
    console.log("data",data.data.departamento);
    console.log("data",data.data.departamento.divipola_n);
    const { puntos } = data.data as { departamento: { name: string }; puntos: Point[] };
    const divipola = data.data.departamento?.divipola_n;
const nombreDepartamento = divipola ? DEPARTAMENTOS[divipola] || `Departamento ${divipola}` : "Departamento no definido";

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
        <div className="bg-white p-6 rounded-md w-96 max-w-full">
        <h2 className="text-lg font-bold mb-4">{ nombreDepartamento}</h2>

          <ul>
            {puntos.map((punto) => (
              <li key={punto.id} className={`mb-2 p-3 rounded-md ${getColor(punto.completeness)}`}>
                <h3 className="font-semibold">{punto.name}</h3>
                <p>Estado: {punto.completeness}</p>
                {punto.datos && (
                  <div>
                    <p>Dirección: {punto.datos.direccion || "N/A"}</p>
                    <p>Teléfono: {punto.datos.telefono || "N/A"}</p>
                    <p>Email: {punto.datos.email || "N/A"}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded-md">Cerrar</button>
        </div>
      </div>
    );
  }
  

  return null; // Si el tipo de data no coincide
};

export default ModalInfo;