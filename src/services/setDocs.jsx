import { doc, addDoc, collection } from "firebase/firestore";
import db from "../firebase/appConfig";
import Swal from "sweetalert2";


const setDocs = async (info) => {

    try {
        await addDoc(collection(db, "infoCodes"), info)
        Swal.fire({
          title: "Invitado registrado",
          text: "Se ha registrado correctamente",
          icon: "success"
        });

    } catch (error) {
        console.error('Error al agregar el invitado', error)
    }

}

export default setDocs