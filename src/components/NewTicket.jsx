import { useForm } from 'react-hook-form';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect, useState, useRef } from 'react';
import getDocs from '../services/getDocs';
import setDocs from '../services/setDocs';
import modPDF from '../services/createTicket';
import Button from '@mui/material/Button';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

export default function NewTicket() {

  const { register, handleSubmit, formState:{errors} } = useForm()
  const [codes, setCodes ] = useState([])
  const [showQR, setShowQR] = useState(false)
  const [info, setInfo] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [message, setMessage] = useState(null)
  const [pdf, setPdf] = useState(null)
  const qrRef = useRef() 

  
  useEffect(()=> {

    getDocs(setCodes)

  },[])

  const onSubmit = async (data) => {

    const info = {
      nombre: data.name,
      tipo: data.type,
      correo: data.email,
      validado: false,
      correlativo: codes.length + 1,
    }    

    console.log(codes);
    
    setInfo(info)
    setDocs(info)
    setShowQR(true)    
  }

  useEffect(() => {

    if(showQR){
        generarPDF()
    }
    
  },[showQR])

  const generarPDF = () => {

    const qrCanvas = qrRef.current.querySelector("canvas");
    const qrImage = qrCanvas.toDataURL("image/png")

    modPDF(qrImage, setIsGenerating, setMessage, setPdf)
  }


  return (
    <>
      <div>
      {
        <div >
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
                {errors.nombre && <span>El campo Nombre es requerido</span>}
            </div>
            <div className='my-3'>
                <label htmlFor="email" className='block text-sm ps-2 font-medium text-start text-white-700'>Correo</label>
                <input
                name='email'
                {...register("email", { required: true })}
                placeholder="nombre@gmail.com"
                className='mt-1 w-50 rounded-md border-gray-200 shadow-sm sm:text-sm px-5 py-2'
                />
                {errors.nombre && <span>El campo Nombre es requerido</span>}
            </div>
            <div className='my-3'>
            <label htmlFor="type" className='block text-sm ps-2 text-start font-medium text-white-700'>Tipo</label>
                <select
                    name="type"
                    id="type"
                    className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm px-5 py-2"
                    {...register("type", {required: true})}
                >
                    <option value="">Tipo de entrada</option>
                    <option value="Invitado">Invitado</option>
                    <option value="Cliente VIP">Cliente VIP</option>
                </select>
                {errors.tipo && <span>El campo Tipo es requerido</span>}
            </div>

            {/* <Button className='w-100' variant="contained" type="submit"> Enviar </Button> */}
            
            <button
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                Enviar
            </button>
          </form>
        </div>    
      }

      <div>
      {   
        info &&
          <div ref={qrRef} style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>            
            <QRCodeCanvas  
            hidden={showQR} 
            title={info.nombre} 
            value={JSON.stringify(info)} 
            size={64}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            marginSize={3}

            />
            {/* <Button variant="contained" onClick={generarPDF} disabled={isGenerating}> {isGenerating ? "Generando PDF..." : "Generar PDF"} </Button> */}
          </div>                   
      }
      </div>     
      <div>
        {
            info &&
            <a href={pdf} download={`ticket-${info.nombre}`} hidden={!pdf} className=''>
                <button className='inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500' >Descargar </button>
                {/* <Button variant="contained" startIcon={<DownloadForOfflineIcon />}> Descargar </Button> */}
            </a>
        }
      </div>
      {message && <p>{message}</p>}
      {
        //pdf && <iframe src={pdf} className='w-full md:w-auto' ></iframe>
      }
      </div>
    </>
  )
}
