const editor = document.getElementById("editor");

let decayTimeout;
let decayInterval;

function rebuildCharacters() {
    const text = editor.innerText;

    editor.innerHTML = "";

    for (let char of text) {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = char;
        editor.appendChild(span);
    }

    placeCaretAtEnd(editor);
}

function placeCaretAtEnd(el) {
    el.focus();

    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function startDecay() {

    clearInterval(decayInterval);

    decayInterval = setInterval(() => {

        const chars = [...editor.querySelectorAll(".char:not(.fade)")];

        if(chars.length === 0){
            clearInterval(decayInterval);
            return;
        }

        chars[0].classList.add("fade");

        setTimeout(()=>{
            chars[0]?.remove();
        },500);

    },120);

}

editor.addEventListener("input",()=>{

    clearTimeout(decayTimeout);
    clearInterval(decayInterval);

    rebuildCharacters();

    decayTimeout = setTimeout(()=>{
        startDecay();
    },3000);

});