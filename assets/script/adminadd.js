const currentUser1 = JSON.parse(localStorage.getItem('currentUser1'));
if (!currentUser1) {
    window.location.href = './adlogin.html'; 
}


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



let formAdd = document.querySelector("#newSongForm");
formAdd.addEventListener("submit",(e)=>{
    console.log("nknk");
e.preventDefault();

    axios.post(`https://nostalgic-pumped-regnosaurus.glitch.me/musicData`,{
        backgroundImage:   previewImage.src ,
        posterUrl:previewImage.src ,
        title: nameInp.value,
        artist: artistInp.value,
        janre: genreSelect.value,
        musicPath: sour.src,
    }) 
}
)





let nameInp = document.querySelector("#title");
let artistInp = document.querySelector("#artist");
let genreSelect = document.querySelector("#genre");