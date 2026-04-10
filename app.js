import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ТВОЙ_API_KEY",
  authDomain: "ТВОЙ_PROJECT.firebaseapp.com",
  projectId: "ТВОЙ_PROJECT_ID",
  storageBucket: "ТВОЙ_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const list = document.getElementById("list");

// ➕ добавить фото
window.addPhoto = async function () {
  const url = document.getElementById("photo").value;

  if (!url) return;

  await addDoc(collection(db, "photos"), {
    url: url
  });

  loadPhotos();
};

// 📥 загрузить все фото
async function loadPhotos() {
  list.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "photos"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const li = document.createElement("li");
    const img = document.createElement("img");

    img.src = data.url;

    li.appendChild(img);
    list.appendChild(li);
  });
}

// при запуске
loadPhotos();
