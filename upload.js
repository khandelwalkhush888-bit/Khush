function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const caption = document.getElementById("caption").value;
  const user = auth.currentUser;

  if (!file || !user) return alert("Please select a file and login!");

  const storageRef = storage.ref("uploads/" + Date.now() + "-" + file.name);
  const uploadTask = storageRef.put(file);

  uploadTask.on("state_changed", 
    snapshot => {},
    error => alert(error.message),
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        const type = file.type.startsWith("image") ? "image" : "video";
        db.ref("posts").push({
          user: user.email,
          url,
          type,
          caption,
          timestamp: Date.now()
        });
        alert("Upload successful!");
        window.location.href = "feed.html";
      });
    }
  );
}