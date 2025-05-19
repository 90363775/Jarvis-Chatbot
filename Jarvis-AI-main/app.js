const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } 
    else if (message.includes('tell me about yourself') || message.includes('who are you')){
        speak("I'm JARVIS, an AI Assistent developed by My Boss, Syed Farhan — your intelligent assistant here to help you with coding, learning, creativity, research, or just having a conversation.");
    }
    else if (message.includes("open camera")) {
        const video = document.getElementById('cameraFeed');
        video.style.display = "block";
    
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                video.srcObject = stream;
                speak("Camera is now open. Press Escape to close.");
    
                // ESC key listener to stop camera
                document.addEventListener('keydown', function escHandler(e) {
                    if (e.key === "Escape") {
                        stream.getTracks().forEach(track => track.stop());
                        video.style.display = "none";
                        speak("Camera has been closed.");
                        document.removeEventListener('keydown', escHandler); // remove listener after close
                    }
                });
            })
            .catch(err => {
                console.error("Error accessing camera:", err);
                speak("Failed to access the camera.");
            });
    }else if (message.includes("play music")) {
        const songs = [
            '"C:\\Users\\syed farhaan\\Music\\ALI MOLA ALI DAM DAM _ Official Full Track _ Remix _ 2019 _ Sultan Ul Qadria Qawwal..mp3"',
            '"C:\\Users\\syed farhaan\\Music\\Maher Zain - Rahmatun Lil’Alameen (Official Music Video) ماهر زين - رحمةٌ للعالمين.mp3"',
            '"C:\\Users\\syed farhaan\\Music\\𝐓𝐞𝐫𝐚 𝐌𝐞𝐫𝐚 𝐇𝐚𝐢 𝐏𝐲𝐚𝐫 𝐀𝐦𝐚𝐫❤️Ishq Murshid - [ OST ] - Singer_ Ahmed Jahanzeb.mp3"'
        ];
        const randomIndex = Math.floor(Math.random() * songs.length);
        const songUrl = songs[randomIndex];
    
        let audio = document.getElementById('audioPlayer');
        if (!audio) {
            audio = document.createElement('audio');
            audio.id = 'audioPlayer';
            document.body.appendChild(audio);
        }
        audio.src = songUrl;
        audio.play().then(() => {
            speak("Playing a random song for you.");
            console.log("Playing:", songUrl);
        }).catch(err => {
            console.error("Failed to play audio:", err);
            speak("Sorry, I couldn't play the music.");
        });
    }else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}