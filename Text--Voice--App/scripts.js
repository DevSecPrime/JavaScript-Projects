let speech = new SpeechSynthesisUtterance();
let convertBtn = document.querySelector("button");
let voice = [];
let voiceSelect = document.querySelector("select");


// change the selected voice
window.speechSynthesis.onvoiceschanged = () => {
    voice = window.speechSynthesis.getVoices();
    // console.log(voice);
    speech.voice = voice[0];

    voice.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
}

// change voice
voiceSelect.addEventListener("change",()=>{
    speech.voice = voice[voiceSelect.value];
})

convertBtn.addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
    
})