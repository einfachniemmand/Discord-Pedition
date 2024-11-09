
            const urlParams2 = new URLSearchParams(window.location.search);
            const code2 = urlParams2.get('code');
            if(code2){
                const data = {
                    client_id: 'CLIENT_ID',
                    client_secret: 'CLIENT_SECRET', 
                    grant_type: 'authorization_code',
                    code: code2,
                    redirect_uri: 'https://data.desaux.000.pe/iris/installer/'
                };

    fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(tokenData => {
        if (tokenData.access_token) {
            const accessToken = tokenData.access_token;
            console.log("Access Token:", accessToken);


            return fetch('https://discord.com/api/users/@me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        } else {
            throw new Error("Access Token konnte nicht abgerufen werden.");
        }
    })
    .then(response => response.json())
    .then(userData => {

        console.log("User Data:", userData);
        processDiscordData(userData);
    })
    .catch(error => {
        discordError()
        console.error('Fehler:', error)
        });
            }
            function hideSuccessDC () {
                document.getElementById("successMsg").style.opacity = "0";
                setTimeout(function(){
                document.getElementById("successMsg").style.display = "none";
                },250)
            }
            function redirectDC () {
                location.href = "https://discord.com/oauth2/authorize?client_id=1304864116418281614&response_type=code&redirect_uri=https%3A%2F%2Fdata.desaux.000.pe%2Firis%2Finstaller%2F&scope=identify";
            }
            function hideErrorDC () {
                document.getElementById("errorMsg").style.opacity = "0";
                setTimeout(function(){
                document.getElementById("errorMsg").style.display = "none";
                    location.search = ""
                },250)
            }
            function discordError () {
                hideMenu();
                document.getElementById("errorMsg").style.display = "block";
                setTimeout(function(){
                    document.getElementById("errorMsg").style.opacity = "1";
                },15)
            }
            function closeSign () {
                document.getElementById("sign-window").style.opacity = "0";
                setTimeout(function(){
                document.getElementById("sign-window").style.display = "none";
                },250)
            }
            function sign () {
                if(localStorage.getItem("e992ej29jewmd") == "1"){
                hideMenu();
                    closeSign();
                    document.getElementById("you-signed").innerHTML = "<i class='fa-regular fa-face-smile-beam' style='margin-right:15px'></i>You already signed!"
                    document.getElementById("logInWithDC").style.display="none";
                    document.getElementById("successMsg").style.display = "block";
                    setTimeout(function(){
                        document.getElementById("successMsg").style.opacity = "1";
                    },15)
                }else{
                hideMenu();
                    document.getElementById("sign-window").style.display = "block";
                    setTimeout(function(){
                        document.getElementById("sign-window").style.opacity = "1";
                    },15)
                }
            }
            var normalMenu = document.getElementById("sign-ask").innerHTML;
            function hideMenu () {
                document.getElementById("sign-ask").style.opacity="";
                setTimeout(function(){
                    document.getElementById("sign-ask").style.display="";
                },250)
                clearInterval(newInterval);
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            }
            async function processDiscordData (hookData) {
            if(localStorage.getItem("") == "1"){
                    sign();
            }else {
                if(hookData){
                    console.log(hookData);
                    if(localStorage.getItem("") == "1"){
                        sign();
                    }else {
                        fetch("https://discord.com/api/webhooks/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                embeds: [{
                                    title: "Die Petition wurde unterschrieben von "+hookData.global_name+" ("+hookData.username+")! <:peepoLove:1277726211514044416>",
                                    color: 0x0047FF,
                                    fields: [
                                        { name: "Unterschrieben von ", value: "<@"+hookData.id+">"},
                                        { name: "Sprache: ", value: hookData.locale}
                                    ]
                                }]
                            })
                        })
                        .then(response => {
                            if(response.ok){
                                document.getElementById("logInWithDC").style.display="none";
                                document.getElementById("successMsg").style.display = "block";
                                setTimeout(function(){
                                    document.getElementById("successMsg").style.opacity = "1";
                                },15)
                                localStorage.setItem("","1");
                            }
                            return(response.ok);
                        })
                        .catch(error => {
                            discordError();
                            console.error("Error on Point 02.", error);
                        });
                    }
                }
            }
            }
            function showMenu (method) {
                document.getElementById("sign-ask").innerHTML = normalMenu;
                if(method == 1) {
                    document.getElementById("adjust-nothanks").innerHTML = "<button onclick='hideMenu()' id='nothanks'><i class='fa-solid fa-xmark' style='margin-right:15px;'></i>Schließen</button>"
                }else if(method == 2){
                    document.getElementById("adjust-nothanks").innerHTML = "<button onclick='openGit(this)' id='nothanks'><i class='fa-solid fa-forward' style='margin-right:15px;'></i>Fortfahren</button>"
                } else {
                    document.getElementById("foot-title").innerHTML = "Sign "+document.getElementById("foot-title").innerHTML
                }
                    document.getElementById("sign-ask").style.display="flex";
                setTimeout(function(){
                    document.getElementById("sign-ask").style.opacity="1";
                },15)
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            }
            var newInterval;
            function nothanks (e) {
                var counter = 5;
                document.getElementById("adjust-nothanks").innerHTML = "<button id='nothanks' class='non-click'><i class='fa-solid fa-stopwatch' style='margin-right:15px;'></i>"+counter+"</button>";
                newInterval = setInterval(function(){
                    counter--;
                    document.getElementById("adjust-nothanks").innerHTML = "<button id='nothanks' class='non-click'><i class='fa-solid fa-stopwatch' style='margin-right:15px;'></i>"+counter+"</button>"
                    if(counter == 0){
                        makeDownload();
                        hideMenu();
                        clearInterval(newInterval);
                    }
                },999)
            }


            function openGit (e) {
                var counter = 5;
                document.getElementById("adjust-nothanks").innerHTML = "<button id='nothanks' class='non-click'><i class='fa-solid fa-stopwatch' style='margin-right:15px;'></i>"+counter+"</button>";
                newInterval = setInterval(function(){
                    counter--;
                    document.getElementById("adjust-nothanks").innerHTML = "<button id='nothanks' class='non-click'><i class='fa-solid fa-stopwatch' style='margin-right:15px;'></i>"+counter+"</button>"
                    if(counter == 0){
                        makeGitHub();
                        hideMenu();
                        clearInterval(newInterval);
                    }
                },999)
            }
            function makeGitHub() {
                setTimeout(function(){
                    location.href = "https://github.com/einfachniemmand/iris_installer";
                },500)
            }
            function makeDownload () {
                setTimeout(function(){
                    downloadblob()
                },500)
            }
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const urlParams = new URLSearchParams(window.location.search);

const error = urlParams.get('error');
const errorDescription = urlParams.get('error_description');
if (error) {
    console.log("Fehler:", error);
    console.log("Fehlerbeschreibung:", errorDescription);
    discordError();
};
        if(isMobile()){
            var wdth = screen.width;
            document.getElementById("fill-js").innerHTML = ".button-select{display:block;padding:10px}button{width:"+(wdth-20)+"px;margin-left:0;margin-right:0}body{padding:0;margin:0;}div.header{font-size:40px;align-items:end;height:120px}div.foot {max-width:"+(wdth+1)+"px;min-width:"+(wdth+1)+"px;padding:0;margin:0;overflow-x:hidden;}div.flex.foot{padding:0;overflow:hidden;background:rgba(0,0,0,0.4);}div.foot.color {margin:0;padding:0px;border-radius:0;min-width:"+(wdth+1)+"px;max-width:"+(wdth+1)+"px;position:absolute;top:0;right:0;}i.xmark{position:fixed;top:7px;right:7px;} span {display:block}.flex{width:"+wdth+"px}span.foot.title#foot-title{width:"+(wdth-25)+"px;padding-left:15px}span.foot.text{width:"+(wdth-26)+"px;padding-left:15px}#slct{width:fit-content;padding:0;margin-left:15px;margin-left:auto;margin-right:auto}button.tb{width:"+(wdth-50)+"px}#nothanks{width:"+(wdth-45)+"px;margin-bottom:25px}#flex-slct{width:"+(wdth-1)+"px;}"
            document.getElementById("sign-ask").style.width = screen.width + "px";
            document.getElementById("sign-ask").style.marginBottom = "0";
        }
