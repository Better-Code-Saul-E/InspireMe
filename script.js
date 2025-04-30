const quote = document.getElementById("quote");
const author = document.getElementById("author");
const languages = document.getElementById("languages");
const generateQuoteBtn = document.getElementById("generateQuote");

const languageOptions = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    zh: "Chinese Simplified",
    ja: "Japanese",
    ko: "Korean",
    ar: "Arabic",
    hi: "Hindi",
    nl: "Dutch",
    pl: "Polish",
    ca: "Catalan",
    da: "Danish",
    fi: "Finnish",
    el: "Greek",
    hu: "Hungarian",
    tr: "Turkish",
    sv: "Swedish",
    no: "Norwegian",
    ro: "Romanian",
    th: "Thai",
    vi: "Vietnamese",
    he: "Hebrew",
    uk: "Ukrainian",
    bn: "Bengali",
    ms: "Malay",
    ta: "Tamil",
    tl: "Tagalog"
};


Object.keys(languageOptions).forEach(lang => {
    const option = document.createElement("option");
    option.value = lang;
    option.textContent = languageOptions[lang];
    languages.appendChild(option);
});

let currentQuote = "";
let currentAuthor = "";

function displayQuote(language = 'en') {
    if (!currentQuote) return;

    if (language === 'en') {
        quote.textContent = currentQuote;
        author.textContent = currentAuthor;
    } else {
        fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(currentQuote)}&langpair=en|${language}`)
        .then(response => response.json())
        .then(data => {
            quote.textContent = data.responseData.translatedText;
            author.textContent = currentAuthor;
        })
        .catch(error => {
            alert('Translation error. Showing original.');
            quote.textContent = currentQuote;
            author.textContent = currentAuthor;
        });
    }
}

function fetchNewQuote(language = 'en') {
    fetch(`http://api.quotable.io/random`)
    .then(response => response.json())
    .then(result => {
        currentQuote = result.content;
        currentAuthor = result.author;
        displayQuote(language);
    })
    .catch(error => {
        alert('Quote fetch error.');
        quote.textContent = "Error getting quote.";
        author.textContent = "developer";
    });
}

generateQuoteBtn.addEventListener("click", () => {
    quote.textContent = "Getting your quote...";
    author.textContent = "be inspired";

    const selectedLang = languages.value;
    setTimeout(() => fetchNewQuote(selectedLang), 1000);
});

languages.addEventListener("change", () => {
    const selectedLang = languages.value;
    displayQuote(selectedLang);
});

fetchNewQuote();