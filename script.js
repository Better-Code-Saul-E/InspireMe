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

function randomQuote(language = 'en') {
    fetch(`http://api.quotable.io/random`)
    .then(response => response.json())
    .then(result => {
        const originalQuote = result.content;
        const quoteAuthor = result.author;

        if (language !== 'en') {
            fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(originalQuote)}&langpair=en|${language}`)
            .then(response => response.json())
            .then(data => {
                quote.textContent = data.responseData.translatedText;
                author.textContent = quoteAuthor;
            })
            .catch(error => {
                alert('Translation error:', error);
                quote.textContent = originalQuote;
                author.textContent = quoteAuthor;
            });
        } else {
            quote.textContent = originalQuote;
            author.textContent = quoteAuthor;
        }
    })
    .catch(error => {
        console.error('Quote fetch error:', error);
        quote.textContent = "Error getting quote.";
        author.textContent = "";
    });
}

generateQuoteBtn.addEventListener("click", () => {
    quote.textContent = "Getting your quote...";
    author.textContent = "be inspired";

    const selectedLang = languages.value;
    setTimeout(() => randomQuote(selectedLang), 2000);
});

randomQuote();
