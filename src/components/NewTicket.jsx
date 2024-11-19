import { useForm } from 'react-hook-form';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect, useState, useRef } from 'react';
import getDocs from '../services/getDocs';
import setDocs from '../services/setDocs';
import modPDF from '../services/createTicket';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import data from '../../empresa.json'

export default function NewTicket() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [codes, setCodes] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [info, setInfo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState('');
  const [pdf, setPdf] = useState(null);
  const qrRef = useRef();

  console.log(data);  

  useEffect(() => {
    getDocs(setCodes);
  }, []);

  const onSubmit = async (data) => {
    const info = {
      nombre: data.name,
      tipo: data.type,
      correo: data.email,
      validado: false,
      correlativo: codes.length + 1,
    };
    setInfo(info);
    setDocs(info)
    setShowQR(true);
  };

  useEffect(() => {
    if (showQR) {
      generarPDF();
    }
  }, [showQR]);

  const generarPDF = () => {
    setIsGenerating(true);
    const qrCanvas = qrRef.current.querySelector("canvas");
    const qrImage = qrCanvas.toDataURL("image/png");
    modPDF(qrImage, setIsGenerating, setMessage, setPdf);
  };

  const handleBack = () => {
    setInfo(null);
    setShowQR(false);
    reset();
  };

  return (
    <div className='self-center h-full flex flex-col justify-center gap-y-4 content-around'>
      {!showQR && (
        <div>
          <h2>Registrar nuevo asistente</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='d-flex justify-content-center align-items-center'>
            <div className='my-3'>
              <label htmlFor="name" className='block text-sm ps-2 font-medium text-start text-white-700'>Nombre</label>
              <input
                name='name'
                {...register("name", { required: true })}
                placeholder="Nombre Apellido"
                className='mt-1 w-50 rounded-md border-gray-200 shadow-sm sm:text-sm px-5 py-2'
              />
              {errors.name && <span className='text-red-300'><br />El campo Nombre es requerido</span>}
            </div>
            <div className='my-3'>
              <label htmlFor="email" className='block text-sm ps-2 font-medium text-start text-white-700'>Correo</label>
              <input
                name='email'
                {...register("email", { required: true })}
                placeholder="nombre@gmail.com"
                className='mt-1 w-50 rounded-md border-gray-200 shadow-sm sm:text-sm px-5 py-2'
              />
              {errors.email && <span className='text-red-300'><br />El campo Correo es requerido</span>}
            </div>
            <div className='my-3'>
              <label htmlFor="type" className='block text-sm ps-2 text-start font-medium text-white-700'>Tipo</label>
              <select
                name="type"
                id="type"
                className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-400 sm:text-sm px-5 py-2"
                {...register("type", { required: true })}
              >
                <option value="">Tipo de entrada</option>
                <option value="Invitado">Invitado</option>
                <option value="Cliente VIP">Cliente VIP</option>
              </select>
              {errors.type && <span className='text-red-300'><br />El campo Tipo es requerido</span>}
            </div>
            <button
              type="submit"
              className="inline-block rounded border place-content-evenly border-indigo-600 bg-indigo-600 mt-3 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              Registrar
            </button>
          </form>
        </div>
      )}

      {info && (
        <div>
          <div ref={qrRef} style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
            <QRCodeCanvas
              hidden={showQR}
              title={info.nombre}
              value={JSON.stringify(info)}
              size={64}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              marginSize={3}
            />
          </div>

          <div>
            {isGenerating && message ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              <div className='flex flex-col gap-y-2'>
                <h2>{message}</h2>
                <a href={pdf} download={`ticket-${info.correo}.pdf`} hidden={!pdf}>
                  <button className='w-full inline-block gap-3 place-content-evenly rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-white'>
                    <DownloadForOfflineIcon /> Descargar
                  </button>
                </a>
                <button onClick={handleBack} className='inline-block rounded border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500'>
                  Regresar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
