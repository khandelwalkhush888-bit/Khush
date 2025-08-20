// Firebase config (your project)
const firebaseConfig = {
  apiKey: "AIzaSyCxo2cc90se6y0JvpKp05d0pFSJvcOdlAw",
  authDomain: "my-kush-project-76909.firebaseapp.com",
  databaseURL: "https://my-kush-project-76909-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-kush-project-76909",
  storageBucket: "my-kush-project-76909.firebasestorage.app",
  messagingSenderId: "438641754521",
  appId: "1:438641754521:web:9fab4c1652789b67fc5308",
  measurementId: "G-009JR4HVT5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

// Auth functions
function toggleSignup() {
  document.getElementById("login-box").classList.add("hidden");
  document.getElementById("signup-box").classList.remove("hidden");
}
function toggleLogin() {
  document.getElementById("signup-box").classList.add("hidden");
  document.getElementById("login-box").classList.remove("hidden");
}

function signup() {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      db.ref("users/" + userCredential.user.uid).set({ name, email });
      window.location.href = "feed.html";
    })
    .catch(err => alert(err.message));
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "feed.html")
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}