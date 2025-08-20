const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const input = document.getElementById("message-input");
  const msg = input.value.trim();
  const user = auth.currentUser;

  if (msg !== "" && user) {
    db.ref("messages").push({
      text: msg,
      user: user.email,
      timestamp: Date.now()
    });
    input.value = "";
  }
}

db.ref("messages").on("child_added", snapshot => {
  const msg = snapshot.val();
  const div = document.createElement("div");
  div.className = "card";
  div.textContent = `${msg.user}: ${msg.text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});