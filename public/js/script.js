//const { response } = require("express");

const video= document.getElementById('video');
const baseUrl = 'http://127.0.0.1:8080/api/users';
const baseEmotion = 'http://127.0.0.1:8080/api/emotions';

var emotionId ="";
var result = "";
var testEmocion = "";



const bontonIntento= document.getElementById('btnIntento');
var count=0;

function startVideo(){
    navigator.getUserMedia=(navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        navigator.getUserMedia(
            {video:{}},
            stream=> video.srcObject = stream,
            err=> console.log(err)
        )
        
}

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    getEmotion()
]).then(startVideo);



//Vamos a tratar que sea a partir de un botón el que podamos hacer todo esto:



bontonIntento.addEventListener('click', async ()=>{
    count++;
    const canvas = faceapi.createCanvasFromMedia(video);
    //document.body.append(canvas);
    const displaySize = {width: video.width, height: video.height};
    faceapi.matchDimensions(canvas, displaySize);
   // setInterval(async ()=>{
        const detections = await faceapi.detectAllFaces(video,new 
        faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections,
        displaySize);
        canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
        
        //faceapi.draw.drawDetections(canvas,resizedDetections);
        //faceapi.draw.drawFaceLandmarks(canvas,resizedDetections);
        //faceapi.draw.drawFaceExpressions(canvas,resizedDetections);
        
        
        
        
        result = await getExpression(detections);
        console.log(result +'y lo que tienes que sacar es: '+ testEmocion);
        console.log('intento numero: ' + count);

        
        
          
    //});
   

/*
video.addEventListener('play', ()=>{
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = {width: video.width, height: video.height};
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async ()=>{
        const detections = await faceapi.detectAllFaces(video,new 
        faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections,
        displaySize);
        canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
        
        faceapi.draw.drawDetections(canvas,resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas,resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas,resizedDetections);
        
        
        
        
        const result = await getExpression(detections);
        console.log(result);
        await postUser();
          
    },3000);
*/
    if(result==testEmocion){
        console.log('Acertado!');
        console.log(emotionId);

        await postTest();

    }
        
});


    async function getExpression(detections){
        const array = []
        for (const [key, value] of  Object.entries(detections[0].expressions)) { //Recorremos el objeto en busca de todas las expresiones
            array.push([key, value]);

            var res=array[0];
            for(var i = 0;i<array.length;i++){
                if(Math.abs(1-res[1])>Math.abs(1-array[i][1])){ //La mas cercana a 1 es la "más acertada"
                    res= array[i];
                }
            }

        }
        return res[0];
    }

    




async function postTest(){
    var res = await fetch('http://127.0.0.1:8080/api/tests',
    {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: "637b48e17e5e4cf71672c91b",
            tipo: "RECONGNIZE",
            intentos: count,
            emotion: emotionId

        })


    })
    console.log(res);
    location.reload();
};


async function getEmotion() { //Requerimos de una emocion para poner en el titulo
    var nuevoH1 = document.createElement('h1');

     var res =await fetch('http://127.0.0.1:8080/api/emotions', 
        {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            
        }
        );
    var respuesta =await res.json();
    switch (respuesta.dataName) {       //Traducimos la emocion, a lo "sucio"
        case 'happy':
            nuevoH1.innerHTML ="Feliz";
            break;
        case 'angry':
            nuevoH1.innerHTML = "Enfadado";
            break;
        case 'surprise':
            nuevoH1.innerHTML = "Sorprendido";
            break;
        case 'sad':
            nuevoH1.innerHTML = "Triste";
            break;
        case 'neutral':
            nuevoH1.innerHTML = "Normal";
            break;    
        default:
            break;
    }
    respuesta.dataName ;
    nuevoH1.id='testEmocion';
    nuevoH1.setAttribute('value', respuesta.data)
    document.querySelector('#titulo').appendChild(nuevoH1); 
    testEmocion = respuesta.dataName;
    emotionId = respuesta.dataId;
    console.log(respuesta.dataId);
    
} 

