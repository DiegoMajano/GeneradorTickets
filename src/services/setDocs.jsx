import { doc, addDoc, collection } from "firebase/firestore";
import db from "../firebase/appConfig";

const setDocs = async (info) => {

    try {
        await addDoc(collection(db, "infoCodes"), info)
        /*Swal.fire({
          title: "Producto editado",
          text: "Se ha editado correctamente el producto",
          icon: "success"
        });*/

    } catch (error) {
        console.error('Error al actualizar el producto', error)
    }

}

export default setDocs