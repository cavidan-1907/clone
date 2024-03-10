
// sessionCheck.js

   



document.getElementById("loginAdd").addEventListener("submit", function(event) {
    event.preventDefault(); // Formun otomatik olarak gönderilmesini engelle

    let name = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    fetch('https://nostalgic-pumped-regnosaurus.glitch.me/admin')
        .then(res => res.json())
        .then(data => {
            let currentUserInfo = data.find((user) => user.name === name);
            if (currentUserInfo) {
                if (currentUserInfo.password === password) {
                    localStorage.setItem('currentUser1', JSON.stringify(currentUserInfo));
                    window.location = './admin.html';
                } else {
                    alert("Incorrect password");
                }
            } else {
                alert("User not found");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
