function previewFile() {
    let show = document.querySelector('#preview')
    let file = document.querySelector('#picture').files[0]
    let reader = new FileReader()

    reader.onloadend = function() {
        show.hidden = false
        show.src = reader.result
    }

    if(file) {
        reader.readAsDataURL(file)
    } else {
        show.src = ""
    }
}