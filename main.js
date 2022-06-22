var counter = 5;
document.addEventListener("DOMContentLoaded", () => {
    const loginAlert = document.querySelector("#alert");
    const TimeLimit = document.querySelector(".timeLimit");
    document.querySelector("#login__button").addEventListener("click", e => {
        e.preventDefault();
        counter-=1;
        if(counter>0){
            document.getElementById("count").innerHTML = counter;
            loginAlert.classList.remove("alert--hidden");
        }else if(counter==0){
            loginAlert.classList.add("alert--hidden");
            TimeLimit.classList.remove("timeLimit-hidden");
        }
    });

});