
import React from "react";
import { ModalData, Point } from "../types";

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

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
    const { puntos } = data.data as unknown as { departamento: { name: string }; puntos: Point[] };
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
        <div className="bg-white p-6 rounded-md w-96 max-w-full">
          {/* <h2 className="text-lg font-bold mb-4">Puntos en {departamento.name}</h2> */}
          <ul>
          {puntos.map((punto) => (
                <li key={punto.id} className={`mb-2 p-3 rounded-md bg-${getColor(punto.completeness)}`}>
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