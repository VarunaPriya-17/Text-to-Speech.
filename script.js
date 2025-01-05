const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const error = document.querySelector('.error-para');
let selectedVoice = null;
const speechSynth = window.speechSynthesis;
const loadVoices = () => {
    const voices = speechSynth.getVoices();
    const girlVoice = voices.find(voice => /female|woman/i.test(voice.name)) || voices[0];
    selectedVoice = girlVoice;
};
speechSynth.onvoiceschanged = loadVoices;
convertBtn.addEventListener('click', () => {
    const enteredText = text.value.trim();
    if (!enteredText.length) {
        error.textContent = "Nothing to Convert! Enter text in the text area.";
        return;
    }
    error.textContent = ""; 
    const speech = new SpeechSynthesisUtterance(enteredText);
    speech.voice = selectedVoice;
    speech.rate = 1; 
    speech.pitch = 1.5; 
    speech.volume = 1; 
    speech.onend = () => {
        convertBtn.textContent = "Play Converted Sound";
    };
    convertBtn.textContent = "Sound is Playing...";
    speechSynth.speak(speech);
});
