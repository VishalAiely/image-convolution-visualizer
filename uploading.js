document.querySelector('#picture').onchange = function previewFile() {
    let show = document.querySelector('#preview')
    let file = document.querySelector('#picture').files[0]
    let reader = new FileReader()

    reader.onloadend = function() {
        show.src = reader.result
    }

    show.onload = function() {
        let canvas = document.querySelector('#can')
        let ctx = canvas.getContext('2d')

        canvas.width = show.width
        canvas.height = show.height

        if (show.width > 1000 || show.height > 1000)
        {
            let newscale = 500/show.width
            canvas.width *= newscale
            canvas.height *= newscale
             ctx.scale(newscale,newscale)
        }

        ctx.drawImage(show,0,0)


        show.style.display = 'none'
        let imageData = ctx.getImageData(0, 0, show.width, show.height);
        let data = imageData.data;
        console.log(data)

        //used to calculate greyscale value
        let avg = 0
        for (let i = 0; i < data.length; i+=4) {
            avg = (data[i] + data[i+1] + data[i+2])/3

            data[i] = data[i+1] = data[i+2] = avg
        }

        ctx.putImageData(imageData,0,0)
    }

    if(file) {
        reader.readAsDataURL(file)
    } else {
        show.src = ""
    }
}