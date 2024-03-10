let plusbtn = document.querySelectorAll(".text2 span");
let ac = document.querySelectorAll(".text2 p");
plusbtn.forEach((plsbtn, index) => {
    let param = ac[index];
    plsbtn.addEventListener("click", () => {
        ac.forEach((p, i) => {
            if (i !== index) {
                p.style.display = "none";
                plusbtn[i].textContent = "↑";
                p.classList.remove("none");
                p.classList.add("param");
            }
        });

        if (plsbtn.textContent === "↑") {

            param.style.display = "block";
            param.style.height = "0";
            plsbtn.textContent = "↓";
            setTimeout(() => {
                param.style.height = param.scrollHeight + "px";
            }, 0);

            param.classList.remove("param");
            param.classList.add("none");
        } else {

            plsbtn.textContent = "↑";
            param.style.height = "0";

            param.classList.remove("none");
            param.classList.add(".text2 p");
        }
    });
})

let list2Icon = document.querySelector('.list2');
let nav2 = document.querySelector('.nav2');

list2Icon.addEventListener("click", () => {
    if (nav2.style.transform === "translateX(100%)") {
        nav2.style.transform = "translateX(0)"
    }
    else {
        nav2.style.transform = "translateX(100%)"
    }
})

let xicon = document.querySelector(".bi-x");
xicon.addEventListener("click", () => {

    nav2.style.transform = "translateX(100%)"


})

window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
        nav2.style.transform = "translateX(100%)"

    }
})



let list3Icon = document.querySelector('.list1');
let nav3 = document.querySelector('.nav3');

list3Icon.addEventListener("click", () => {
    if (nav3.style.transform === "translateX(-100%)") {
        nav3.style.transform = "translateX(0)"
    }
    else {
        nav3.style.transform = "translateX(-100%)"
    }
})

let xicon1 = document.querySelector(".x2");
xicon1.addEventListener("click", () => {

    nav3.style.transform = "translateX(-100%)"


})

window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
        nav3.style.transform = "translateX(-100%)"

    }
})

let navLinks = document.querySelectorAll('nav ul li a');
let nav = document.querySelector("nav");

navLinks.forEach((element) => {
    element.addEventListener("click", (event) => {
        nav.style.borderBottom = '2px solid #ffda2a';
    });
});

let logins = document.querySelectorAll(".login");
let logs = document.querySelectorAll(".log");
let music1 = document.querySelector(".music1");
let video2 = document.querySelector("#video-container2");
let list = document.querySelector(".list");
let urll = "https://nostalgic-pumped-regnosaurus.glitch.me/acount";
let logoutBtn = document.querySelector('.logout');

async function fetchData() {
    let res = await axios.get(urll);
    return res.data;
}

let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).name : null;
let id = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null;

async function updateLoginText() {
    let data = await fetchData();

    if (logs.length > 0) {
        logs.forEach((log23) => {
            if (user) {
                logoutBtn.style.display = "block";
                log23.addEventListener("click",(e)=>{
                    e.preventDefault();
                    window.location=`./user.html?id=${id}`
                });
                log23.innerHTML = `<i class="bi bi-person-circle"></i> ${user}`;  
                video2.style.display="block";
                music1.style.display="none";
                list.style.display="none";
            } else {
                log23.addEventListener("click",(e)=>{
                    e.preventDefault();
                    window.location="./login.html"
                });
            }
        });
    }
    
    logins.forEach((login) => {
        login.textContent = "Subscribe Now";
    });
   
     
    // music1.style.display="none";
    // list.style.display="none";
    // video2.style.display="block";
}

updateLoginText();

async function logout() {
    let data = await fetchData();

    if (logoutBtn && logoutBtn.style.display === "block") {
        logoutBtn.addEventListener('click', () => {
            window.location.reload();
            logoutBtn.style.display = "none";
            localStorage.removeItem('currentUser');
        window.location="./index.html";
        music1.style.display = "block";
        list.style.display = "block";
        video2.style.display = "none";
      
            logs.forEach((log23) => {
                log23.innerHTML =`<a href="#" class="log"> <i class="bi bi-person-circle"></i> sign in</a>`;
                log23.style.color="#fff";
            });

          
       
           
        });
    }
}


logout();

let homs = document.querySelectorAll(".hom");
homs.forEach((hom)=>{
    hom.addEventListener("click",()=>{
        window.location="./index.html";
        nav.style.borderBottom = '2px solid #ffda2a';
    });
});


