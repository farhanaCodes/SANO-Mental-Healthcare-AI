const chatbox= document.getElementById("chat-box");
const userinput=document.getElementById("user-input");
const sendbtn=document.getElementById("send-btn");

function addmessage(message,className){
    const msgdiv=document.createElement("div");
    msgdiv.classList.add("message",className)
    msgdiv.textContent=message;
    chatbox.appendChild(msgdiv);
    chatbox.scrollTop=chatbox.scrollHeight;

}

function showtyping(){
    const typingdiv=document.createElement("div");
    typingdiv.classList.add("message","bot-msg");
    typingdiv.textContent="AI is typing....";
    chatbox.appendChild(typingdiv);
    chatbox.scrollTop=chatbox.scrollHeight;
    return typingdiv;
}

sendbtn.onclick=async()=>{
    const message =userinput.value.trim();
    if(message==="")
        return;
    addmessage(message,"user-msg");
    userinput.value="";
    
    const typingdiv=showtyping();

    try {

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    });

    const data = await response.json();

    typingdiv.remove();

    addmessage(data.reply, "bot-msg");

} catch (error) {

    typingdiv.remove();

    addmessage("Something went wrong.", "bot-msg");

    console.log(error);

}


    localStorage.setItem("chatHistory",chatbox.innerHTML);

}

userinput.addEventListener("keypress",(e)=>{
    if(e.key==="Enter")
        sendbtn.click();
})