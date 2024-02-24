import firebase from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase)
export default async function addData(colllection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}