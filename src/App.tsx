import React, { useEffect, useState, useRef } from 'react'; // Removed unused useEffect, ChangeEvent
import './App.css';
import Konva from 'konva';

function App() {
//   const [file, setFile] = useState(''); // Store the image URL as a string
  const fileInputRef = useRef(null); // Correctly initialized the ref with useRef
  
  const [file, setFile] = useState<string | undefined>();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [blurRadius, setBlurRadius] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new window.Image();
        img.src = e.target.result as string;
        img.onload = () => {
          setImage(img);
        };
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (image) {
      const stage = new Konva.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const layer = new Konva.Layer();

      const konvaImage = new Konva.Image({
        image: image,
        x: 80,
        y: 30,
        blurRadius: blurRadius,
        draggable: true,
      });

      konvaImage.cache();
      konvaImage.filters([Konva.Filters.Blur]);

      layer.add(konvaImage);
      stage.add(layer);
    }
  }, [image, blurRadius]);

  
  return (
    <div className="App">
      <div id="container"></div>
      <p>Add Image: </p>
      <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
        Upload Image
      </button> 
      <input
        type="file"
        onChange={handleChange} // Fixed to use the handleChange function
        ref={fileInputRef} // Fixed the ref to use the useRef hook correctly
        style={{ display: 'none' }} // Hide the input element
      />
      <button id='filter' onClick={ () => setBlurRadius(Number(10))}>Apply Filter</button>
    </div>
 );
}

export default App;