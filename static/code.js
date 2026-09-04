let option= document.querySelectorAll(".options");
let moodbtn= document.querySelectorAll(".mood_item");

let ai_btn=document.getElementById("ai");

ai_btn.addEventListener("click",function() {
    window.open("/chatbot","_blank");
});

let article_btn = document.getElementById("article");

article_btn.addEventListener("click", function() {
    window.open("/article", "_blank");
});


let research_btn= document.getElementById("research");
research_btn.addEventListener("click", function() {
    window.open("/research", "_blank");
});


let about_btn = document.getElementById("about");

about_btn.addEventListener("click", function() {
    window.open("/about", "_blank");
});

document.getElementById("game").addEventListener("click",function() {
    window.open("https://poki.com/","_blank");
});

document.getElementById("dance").addEventListener("click",function() {
    window.open("https://www.steezy.co/","_blank");
});

let happy_btn=document.getElementById("happy");

happy_btn.addEventListener("click",function() {
   
   alert("its very good that your are happy... you should dance to more cheerup");
    console.log(happy_btn);

}); 

let sad_btn = document.getElementById("sad");

sad_btn.addEventListener("click",function() {
    alert("I am here for you.Do you want to talk about it, or would you prefer a distraction?")

})

let worried_btn = document.getElementById("worried")
worried_btn.addEventListener("click",function(){
    alert("I see that you're having a hard time.You can go for a walk, get fresh air, or you can listen some music to calm yourself")
})

let tired_btn = document.getElementById("tired")
tired_btn.addEventListener("click",function(){
    alert("It sounds like you have a lot on your plate. It's okay to be tired.....please take rest and you can listen some music or do meditation to relief yourself")
})

let scared_btn = document.getElementById("scared")
scared_btn.addEventListener("click",function(){
    alert("It will be alright,I am with you,take a deep breath...Take your time, there is no rush,you can tell me whatever you want in the messege box,it will safe with me and you should do some meditation")
})

let angry_btn = document.getElementById("angry")
angry_btn.addEventListener("click",function(){
    alert("Can you help me understand what upset you? Don't take any action in anger.Everything will be fine after some times, just you have to do a breathing session and meditation to calm down yourself and then talk with AI.Your words always safe with us ")
})


function toggletopic(topic, btn) {
const panel = document.getElementById("panel-"+topic);
if (!panel) return;
const panelall= document.querySelectorAll('.panel');
const topic_btnall=document.querySelectorAll('.topic-btn')

const isopen= panel.classList.contains('open');

panelall.forEach(p=>p.classList.remove('open') );
topic_btnall.forEach(b=>b.classList.remove('active'));


    if (!isopen){
        panel.classList.add('open');
        btn.classList.add('active');
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

}


let music_btn = document.getElementById("music_label");
music_btn.addEventListener("click", function() {
    window.open("/music", "_blank");
});


let meditation_btn = document.getElementById("meditation_label");
meditation_btn.addEventListener("click", function() {
    window.open("/meditation", "_blank");
});


const Inhale=4500,Hold=1000,Exhale=6000;
document.documentElement.style.setProperty("--inhale-dur",(Inhale/1000)+"s");
document.documentElement.style.setProperty("--exhale-dur",(Exhale/1000)+"s");

const rings=document.querySelectorAll(".pulse-ring");
const circle=document.getElementById("breathcircle");
const breathlabel=document.getElementById("breathlabel");
const breathsub = document.getElementById("breathsub");
const time = document.getElementById('time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById("pause");
const endBtn = document.getElementById("end");
const para = document.getElementById('para3');


let breathpause= false; //This is just a variable.True → breathing is paused.False → breathing is running.It is NOT a button.It is only used to remember the current state.
let breathid;
let timeinterval;
let seconds=0;

function setphase(phase){
    circle.className ='';
    void circle.offsetWidth;
    if(phase=="inhale"){
        circle.classList.add("inhaling");
            breathlabel.textContent="Inhale";
            breathsub.textContent="breathe in slowly....";
            rings.forEach(r=>r.classList.add("active"));
        
    }
    else if (phase=="hold"){
        circle.classList.add("holding");
        breathlabel.textContent="Hold";
    
    }
    else if(phase=="exhale"){
        circle.classList.add("exhaling");
        breathlabel.textContent="Exhale";
        breathsub.textContent="exhale slowly...";
        rings.forEach(r=>r.classList.remove("active"));

    }
}

function breathcycle(){
    setphase("inhale");

    breathid=setTimeout(() => {
        setphase("hold");
        
        breathid= setTimeout(()=>{
            setphase("exhale");



            breathid=setTimeout(()=>{
                if(!breathpause) {
                    breathcycle();
                }
            },Exhale);
        },Hold);
    }, Inhale);
}
function starttimer(){
    timeinterval=setInterval(() => {
        seconds++;
        let mins = Math.floor(seconds/60);
        let secs = seconds%60 ; 
        time.textContent= String(mins).padStart (2,'0') + ":" + String(secs).padStart(2,'0');
    }, 1000);
}
startBtn.addEventListener("click",()=>{
    breathpause = false;
    clearInterval(timeinterval);
    breathcycle();
    starttimer();
    pauseBtn.disabled= false;
    endBtn.disabled = false;

});
pauseBtn.addEventListener('click',()=>{
    breathpause =true;
    clearTimeout(breathid);
    clearInterval(timeinterval);
    breathlabel.textContent = "Paused";
    breathsub.textContent='';
});
endBtn.addEventListener("click",()=>{

    breathpause = true;

    clearTimeout(breathid);
    clearInterval(timeinterval);

    seconds = 0;

    

    breathlabel.textContent = "Session Ended ";
    breathsub.textContent = "Keep doing to feel better";

    circle.className = "";

    rings.forEach(r=>r.classList.remove("active"));

    pauseBtn.disabled = true;
    endBtn.disabled = true;
});


