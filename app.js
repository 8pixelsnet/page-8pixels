async function loadJson(url) {
    let response = await fetch(url)
    return await response.json()
}

async function getDictionary() {
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.split("-")[0]
    var dictionary = await loadJson("languages/en.json")
    try {
        dictionary = await loadJson("languages/" + userLang + ".json")
    } catch { }
    return dictionary
}

async function loadLanguage(dictionary) {
    var elements = Array.from(document.getElementsByTagName("text"));
    elements.forEach(element => {
        var content = dictionary[element.getAttribute("key")]
        element.textContent = content
    })
}

async function checkBrowser(dictionary) {
    if (document.createElement("detect").style.zoom !== "") {
        swal(dictionary["incompatible_browser"]);
    }
}

async function main() {
    var dictionary = await getDictionary()
    loadLanguage(dictionary)
    checkBrowser(dictionary)
}

main()