async function loadJson(url) {
    let response = await fetch(url)
    return await response.json()
}

function getLanguage() {
    var language = navigator.language || navigator.userLanguage;
    language = language.split("-")[0]
    return language
}

async function getDictionary(userLanguage) {
    var dictionary = await loadJson("languages/en.json")
    try {
        dictionary = await loadJson("languages/" + userLanguage + ".json")
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
    var userLanguage = getLanguage()

    var dictionary = await getDictionary(userLanguage)
    loadLanguage(dictionary)
    checkBrowser(dictionary)

    if (userLanguage == 'pt') {
        var elements = Array.from(document.getElementsByClassName("just_portuguese"))
        elements.forEach(element => {
            element.hidden = false
        })
    }
}

main()