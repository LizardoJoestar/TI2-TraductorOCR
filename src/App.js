import { useState, useEffect } from 'react';
import {createWorker} from 'tesseract.js';
import './App.css';

function App() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [textResult, setTextResult] = useState("");

	const worker = createWorker();

	const convertImagetoText = async () =>{
		await worker.load();
		await worker.loadLanguage("spa"); /*Establecer un lenguaje*/
		await worker.initialize("spa"); /*Inicializar*/
		const { data } = await worker.recognize(selectedImage); /*Extraer el texto de la imagen*/
		setTextResult(data.text);
	}

	useEffect(() => {
		convertImagetoText();
	}, [selectedImage])
	

	const handleChangeImage = e =>{
		setSelectedImage(e.target.files[0]);
	}

	if (textResult !== '') {
		printSigns(textResult);	
	}

	return( 
		<div className='container'>
			<h1>Traductor de texto a lenguaje de señas mexicano</h1>
			<p className='description'>Esta webapp extrae el texto de una imagen y deletrea su equivalente al lenguaje de señas mexicano.</p>
			<div className='container-input'>
			<label htmlFor='upload'>Cargar Imagen</label>
			<input type='file' id='upload' accept='image/*' onChange={handleChangeImage}/> {/*Input que solo acepta imagenes, de cualquier extension*/}
			</div>

			<div className='results'>
			<h3>Imagen</h3>
			<h3>Texto de la imagen</h3>
			{selectedImage && (
				<div className='results-image'>
				<img src={URL.createObjectURL(selectedImage)} alt='Miniatura'></img>
				</div>
			)}
			{textResult && (
				<div className='results-paragraph'>
				<p>{textResult}</p>
				</div>
			)}
			</div>
		</div>
	);
	}

function isLetter(letter='') {
	return letter.length === 1 && (letter.toLowerCase() !== letter.toUpperCase());
}

function printSigns(text='') {
	let div = document.getElementById('signs');

	// Delete all child nodes (signs) in case another
	// translation comes in
	// Also somehow ensures only one set of signs is printed
	// instead of 2. Lucky accident!
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}

	for (const elem of text) {
		if (isLetter(elem)) {
			let img = document.createElement('img');
			
			// This file structure only works for UNIX and UNIX-like OSs
			// such as Linux or MacOS
			img.src = require('./alphabet/' + elem.toUpperCase() + '.png');
			img.className = 'signs';
			console.log('Image: ' + img.src + ' Class: ' + img.className);
			div.appendChild(img);
		}
	}
}

export default App;
