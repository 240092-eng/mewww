import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVrBCFo9Y_Y0jE4q57Qk-76zGQmgCu6fw",
  authDomain: "me-c2e04.firebaseapp.com",
  projectId: "me-c2e04",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const input = document.getElementById("photoUrl");
const list = document.getElementById("list");


// ➕ добавить фото по Enter
input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const url = input.value.trim();
    if (!url) return;

    await addDoc(collection(db, "photos"), {
      url,
      likes: 0
    });

    input.value = "";
    loadPhotos();
  }
});


// ❤️ лайк
window.likePhoto = async function (id, currentLikes) {
  const ref = doc(db, "photos", id);

  await updateDoc(ref, {
    likes: currentLikes + 1
  });

  loadPhotos();
};


// 📥 загрузка
async function loadPhotos() {
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "photos"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <img src="${data.url}">
      <div>
        <button class="like-btn" onclick="likePhoto('${docSnap.id}', ${data.likes || 0})">
          ❤️
        </button>
        <span class="count">${data.likes || 0}</span>
      </div>
    `;

    list.appendChild(div);
  });
}

loadPhotos();
