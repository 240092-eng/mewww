import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVrBCFo9Y_Y0jE4q57Qk-76zGQmgCu6fw",
  authDomain: "me-c2e04.firebaseapp.com",
  projectId: "me-c2e04",
  storageBucket: "me-c2e04.firebasestorage.app",
  messagingSenderId: "653957170045",
  appId: "1:653957170045:web:639e966a9d35c36eb9c214"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersRef = collection(db, "users");

window.addUser = async function () {
  const name = document.getElementById("name").value;
  const photo = document.getElementById("photo").value;

  if (!name || !photo) {
    alert("Заполни имя и фото 💖");
    return;
  }

  await addDoc(usersRef, {
    name,
    photo
  });

  alert("Добавлено 💖");
};

window.loadUsers = async function () {
  const snap = await getDocs(usersRef);

  const list = document.getElementById("list");
  list.innerHTML = "";

  snap.forEach(doc => {
    const data = doc.data();

    const li = document.createElement("li");

    li.innerHTML = `
      <div style="
        display:flex;
        align-items:center;
        gap:10px;
        background:#ffe4ec;
        padding:10px;
        border-radius:12px;
      ">
        <img src="${data.photo}" style="
          width:50px;
          height:50px;
          border-radius:50%;
          object-fit:cover;
        ">
        <span>${data.name}</span>
      </div>
    `;

    list.appendChild(li);
  });
};
