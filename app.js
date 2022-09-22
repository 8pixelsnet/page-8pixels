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

async function loadLanguage() {
    var dictionary = await getDictionary()
    var elements = Array.from(document.getElementsByTagName("text"));
    elements.forEach(element => {
        console.log(element.getAttribute("key"))
        var content = dictionary[element.getAttribute("key")]
        element.textContent = content
    })
}

loadLanguage()