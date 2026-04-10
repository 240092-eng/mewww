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


// 🔥 ТВОЙ CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDVrBCFo9Y_Y0jE4q57Qk-76zGQmgCu6fw",
  authDomain: "me-c2e04.firebaseapp.com",
  projectId: "me-c2e04",
  storageBucket: "me-c2e04.appspot.com",
  messagingSenderId: "653957170045",
  appId: "1:653957170045:web:639e966a9d35c36eb9c214",
  measurementId: "G-EJ3HNVZTSG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const list = document.getElementById("list");
const urlInput = document.getElementById("photoUrl");
const fileInput = document.getElementById("fileInput");


// 🔗 ДОБАВЛЕНИЕ ПО ССЫЛКЕ
urlInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const url = urlInput.value.trim();
    if (!url) return;

    await addDoc(collection(db, "photos"), { url });

    urlInput.value = "";
    loadPhotos();
  }
});


// 📁 ЗАГРУЗКА С ПК
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


// 📥 ЗАГРУЗКА ФОТО
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
