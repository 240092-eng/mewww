import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyDVrBCFo9Y_Y0jE4q57Qk-76zGQmgCu6fw",
  authDomain: "me-c2e04.firebaseapp.com",
  projectId: "me-c2e04",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const input = document.getElementById("photoUrl");
const list = document.getElementById("list");

input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const url = input.value.trim();
    if (!url) return;

    await addDoc(collection(db, "photos"), {
      url,
      likes: 0,
      dislikes: 0
    });

    input.value = "";
    loadPhotos();
  }
});

window.likePhoto = async function (id, currentLikes) {
  await updateDoc(doc(db, "photos", id), {
    likes: currentLikes + 1
  });
  loadPhotos();
};

window.dislikePhoto = async function (id, currentDislikes) {
  await updateDoc(doc(db, "photos", id), {
    dislikes: currentDislikes + 1
  });
  loadPhotos();
};

window.deletePhoto = async function (id) {
  await deleteDoc(doc(db, "photos", id));
  loadPhotos();
};

async function loadPhotos() {
  list.innerHTML = "";
  const snapshot = await getDocs(collection(db, "photos"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <img src="${data.url}">
      <div style="margin-top:10px;">
        <button class="like-btn" onclick="likePhoto('${docSnap.id}', ${data.likes || 0})">❤️</button>
        <span class="count">${data.likes || 0}</span>

        <button class="like-btn" onclick="dislikePhoto('${docSnap.id}', ${data.dislikes || 0})">💔</button>
        <span class="count">${data.dislikes || 0}</span>

        <button class="like-btn" onclick="deletePhoto('${docSnap.id}')">🗑️</button>
      </div>
    `;

    list.appendChild(div);
  });
}

loadPhotos();
