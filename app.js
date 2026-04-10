// Firebase CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersRef = collection(db, "users");


// ======================
// 1 ФУНКЦИЯ — ДОБАВИТЬ
// ======================
window.addUser = async function () {
  await addDoc(usersRef, {
    name: "Alex",
    age: 20
  });

  alert("Добавлено!");
};


// ======================
// 2 ФУНКЦИЯ — ЗАГРУЗИТЬ
// ======================
window.loadUsers = async function () {
  const snap = await getDocs(usersRef);

  const list = document.getElementById("list");
  list.innerHTML = "";

  snap.forEach(doc => {
    const data = doc.data();

    const li = document.createElement("li");
    li.textContent = data.name + " (" + data.age + ")";
    list.appendChild(li);
  });
};
