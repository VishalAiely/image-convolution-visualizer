const inputCanvas = document.querySelector('#can')
const outputCanvas = document.querySelector('#outputImage')

function gN(ind) {
    return document.getElementById(ind).value    
}

function getIndex(x,y,canvaswidth)
{
    return y * (4*canvaswidth) + 4*x
}

function getVal(data, x, y, canvaswidth) {
    //in this greyscale image all rgb values are the same
    return data[getIndex(x,y,canvaswidth)]
}

function applyKernalAt(kernel, x, y, canvaswidth, canvasheight, kernelNegative, data) {
    let sum = 0
    const xBreak = Math.floor(kernel[0].length/2)
    const yBreak = Math.floor(kernel.length/2)

    if(x < xBreak || y < yBreak){
        return 0
    }
    
    if(canvaswidth-1-x < xBreak || canvasheight-1-y < yBreak){
        return 0
    }

    const startX = x - xBreak
    const startY = y - yBreak

    //generates the sum when applying the kernel at (x,y)
    for(let i = 0; i < kernel.length; i++){
        for(let j = 0; j < kernel[i].length; j++){
            sum += kernel[i][j] * getVal(data, x+j, y+i, canvaswidth)
        }
    }

    return sum
}

function generateOut() {
    kernel = [[gN('00'),gN('01'),gN('02')],
              [gN('10'),gN('11'),gN('12')],
              [gN('20'),gN('21'),gN('22')]]

    //Fixes the size to match the input image
    outputCanvas.width = inputCanvas.width
    outputCanvas.height = inputCanvas.height
    
    let incontext = inputCanvas.getContext('2d')
    let in_imagedata = incontext.getImageData(0,0,inputCanvas.width,inputCanvas.height)
    let in_data = in_imagedata.data

    let outcontext = outputCanvas.getContext('2d')

    let out_imagedata = outcontext.getImageData(0,0,outputCanvas.width,outputCanvas.height)
    let out_data = out_imagedata.data

    let kernelNegative = false
    kernel.forEach((row)=>{row.forEach((value)=>{
        if(value < 0) kernelNegative = true
    })})


    for (let x = 0; x < outputCanvas.width; x++) {
        for (let y = 0; y < outputCanvas.height; y++) {
            let calc = applyKernalAt(kernel,x,y,outputCanvas.width,outputCanvas.height,kernelNegative,in_data)
            out_data[getIndex(x,y,outputCanvas.width)] = out_data[getIndex(x,y,outputCanvas.width)+1] = out_data[getIndex(x,y,outputCanvas.width)+2] = calc
            out_data[getIndex(x,y,outputCanvas.width)+3] = 255 
        }
    }

    outcontext.putImageData(out_imagedata,0,0)
    
}