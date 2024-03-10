
let user23=localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')): null;
if (!user) {
    window.location="./login.html"
}
let name1 = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).name : null;
let mail1 = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).mail : null;
let id2 = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null;
console.log(name1);
console.log(mail1);
let uptadeId=null;
// Selecting elements
const userProfileForm = document.getElementById("userProfileForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const editProfileBtn = document.getElementById("editProfileBtn");
const saveProfileBtn = document.getElementById("saveProfileBtn");

// Fetch user data
async function fetchUserData() {
    const response = await axios.get("https://nostalgic-pumped-regnosaurus.glitch.me/acount");
    const userData = response.data;
    return userData;
}

// Update user profile form with fetched data
async function updateUserProfileForm() {
    const userData = await fetchUserData();
    if (userData) {
        fullNameInput.value = name1;
        emailInput.value = mail1;
    }
}

// Düzenleme düğmesine tıklama olayı
editProfileBtn.addEventListener("click", () => {
    fullNameInput.disabled = !fullNameInput.disabled;
    emailInput.disabled = !emailInput.disabled;
});

// Kaydetme düğmesine tıklama olayı
saveProfileBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const fullName = fullNameInput.value;
    const email = emailInput.value;


 axios.patch(`https://nostalgic-pumped-regnosaurus.glitch.me/acount/${id2}`, {
            name: fullName,
            mail: email
        });
            // Local Storage'daki kullanıcı verilerini güncelle
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.name = fullName;
            currentUser.mail = email;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log("Profile updated successfully!");
  
});

updateUserProfileForm();

// Form elemanlarını seçme
const posterFileInput = document.querySelector('#posterFile');
const previewImage = document.querySelector('#previewImage');
let sour = document.querySelector(".sour");
let audioPlayer = document.querySelector("#audioPlayer"); 
let musicFileInput= document.querySelector("#audioFile")
// Resim dosyası seçildiğinde önizleme yapma
posterFileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImage.src = event.target.result;
        
        }
        reader.readAsDataURL(file);
    } 
});


musicFileInput.addEventListener("change", (e) => {
    let src1 = e.target.files[0];
    if (src1) {
        let reader = new FileReader();
        reader.readAsDataURL(src1);
        reader.onload = (e) => {
            sour.src = e.target.result;
            audioPlayer.load(); // Yüklenen kaynağı audioPlayer'a yükle
        }
    }
});


let nameInp = document.querySelector("#title");
let artistInp = document.querySelector("#artist");
let genreSelect = document.querySelector("#genre");

let tbody = document.querySelector(".tbody");
async function getUsersongss() {
    const res = await axios.get('https://nostalgic-pumped-regnosaurus.glitch.me/musicData');
    const data = await res.data;
    console.log(data);
    data.forEach(element => {
     if (element. userId === id2) {
        tbody.innerHTML +=
        `
        <tr>
        <td>${element.id}</td>
        <td>${element.title}</td>
        <td>${element.janre}</td>
        <td>${element.artist}</td>
        <td><i class="editBtn bi bi-arrow-clockwise" onclick="uptadeSong(${element.id})"></i></td>
        <td><i class="deleteBtn bi bi-trash" onclick="deleteSong(${element.id})"></i></td>
      </tr>
    `;
        
     }   
    });
}


getUsersongss();

function uptadeSong(id){
    axios.get(`https://nostalgic-pumped-regnosaurus.glitch.me/musicData/${id}`).then((res)=>{
uptadeId = res.data.id,
nameInp.value = res.data.title,
 previewImage.src = res.data.posterUrl,
 sour.src = res.data.musicPath,
 genreSelect.value = res.data.janre,
 artistInp.value =res.data.artist

    });
}



let formAdd = document.querySelector("#newSongForm");
formAdd.addEventListener("submit",(e)=>{
    console.log("nknk");
e.preventDefault();
if (!uptadeId) {
    axios.post(`https://nostalgic-pumped-regnosaurus.glitch.me/musicData`,{
        backgroundImage:   previewImage.src ,
        posterUrl:previewImage.src ,
        title: nameInp.value,
        artist: artistInp.value,
        janre: genreSelect.value,
        musicPath: sour.src,
        userId:id2
    })   
}

else{
    axios.patch(`https://nostalgic-pumped-regnosaurus.glitch.me/musicData/${uptadeId}`,{
        posterUrl:previewImage.src ,
        backgroundImage:   previewImage.src ,
        posterUrl:previewImage.src ,
        title: nameInp.value,
        artist: artistInp.value,
        janre: genreSelect.value,
        musicPath: sour.src,
    })
}
})

function deleteSong(id) {
    axios.delete(`https://nostalgic-pumped-regnosaurus.glitch.me/musicData/${id}`)
    window.location.reload();
  }
     