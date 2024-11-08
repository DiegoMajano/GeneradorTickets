import { collection, doc, onSnapshot } from "firebase/firestore";
import db from "../firebase/appConfig";

const getDocs = (setCodes) => {

    onSnapshot(
        collection(db, "infoCodes"), (snapshot) => {      
          const codes = snapshot.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
          })
          console.log(codes);          
          setCodes(codes)        
        }
      )
}

export default getDocs