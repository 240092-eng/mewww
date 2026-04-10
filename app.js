import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// 🔥 ТВОЙ FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDVrBCFo9Y_Y0jE4q57Qk-76zGQmgCu6fw",
  authDomain: "me-c2e04.firebaseapp.com",
  projectId: "me-c2e04",
  storageBucket: "me-c2e04.firebasestorage.app",
  messagingSenderId: "653957170045",
  appId: "1:653957170045:web:639e966a9d35c36eb9c214",
  measurementId: "G-EJ3HNVZTSG"
};


// 🚀 INIT FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersRef = collection(db, "users");


// =========================
// 1 ФУНКЦИЯ — ДОБАВИТЬ
// =========================
window.addUser = async function () {
  try {
    await addDoc(usersRef, {
      name: "Alex",
      age: 20
    });

    alert("Добавлено в Firestore!");
  } catch (e) {
    console.error("Ошибка добавления:", e);
  }
};


// =========================
// 2 ФУНКЦИЯ — ПОЛУЧИТЬ
// =========================
window.loadUsers = async function () {
  try {
    const snap = await getDocs(usersRef);

    const list = document.getElementById("list");
    list.innerHTML = "";

    snap.forEach(doc => {
      const data = doc.data();

      const li = document.createElement("li");
      li.textContent = `${data.name} (${data.age})`;

      list.appendChild(li);
    });

  } catch (e) {
    console.error("Ошибка чтения:", e);
  }
};
};
