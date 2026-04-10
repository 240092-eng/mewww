import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// ⚠️ ВСТАВЬ СВОИ ДАННЫЕ
const firebaseConfig = {
  apiKey: "ТВОЙ_API_KEY",
  authDomain: "ТВОЙ_PROJECT.firebaseapp.com",
  projectId: "ТВОЙ_PROJECT_ID",
  storageBucket: "ТВОЙ_PROJECT.appspot.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const list = document.getElementById("list");
const urlInput = document.getElementById("photoUrl");
const fileInput = document.getElementById("fileInput");


// 🔥 1. ДОБАВЛЕНИЕ ПО ССЫЛКЕ (Enter)
urlInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const url = urlInput.value.trim();
    if (!url) return;

    await addDoc(collection(db, "photos"), { url });

    urlInput.value = "";
    loadPhotos();
  }
});


// 🔥 2. ЗАГРУЗКА С ПК (авто)
fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];
  if (!file) return;

  const storageRef = ref(storage, "images/" + Date.now() + "_" + file.name);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  await addDoc(collection(db, "photos"), {
    url: downloadURL
  });

  fileInput.value = "";
  loadPhotos();
});


// 📥 ЗАГРУЗКА ВСЕХ ФОТО
async function loadPhotos() {
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "photos"));

  snapshot.forEach((doc) => {
    const data = doc.data();

    const img = document.createElement("img");
    img.src = data.url;

    list.appendChild(img);
  });
}


// запуск
loadPhotos();
