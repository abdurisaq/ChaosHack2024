import React, { useEffect, useState, useRef } from 'react'; // Removed unused useEffect, ChangeEvent
import './App.css';
import Konva from 'konva';

function App() {
//   const [file, setFile] = useState(''); // Store the image URL as a string
  const fileInputRef =useRef<HTMLInputElement | null>(null);; // Correctly initialized the ref with useRef
  
  //const [file, setFile] = useState<string | undefined>();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [blurRadius, setBlurRadius] = useState(0);
  const [pixelSize, setPixelSize] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [embossBlend, setEmbossBlend] = useState(false);
  const [enhance, setEnhance] = useState(0);
  const [greyscale, setGreyscale] = useState(false);
  const [hue, setHue] = useState(0);
  const [noise, setNoise] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [value, setValue] = useState(0);
  const [lightness, setLightness] = useState(0);
  const [luminance, setLuminance] = useState(0);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [invert, setInvert] = useState(false);
  const [kaleidoscope, setKaleidoscope] = useState(0);
  const [mask, setMask] = useState(0);
  const [posterize, setPosterize] = useState(0);
  const [threshold, setThreshold] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target === null) {
          return;
        }
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
        width: 400,
        height: 400,
        
      });

      const layer = new Konva.Layer();

      const konvaImage = new Konva.Image({
        image: image,
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        blurRadius: blurRadius,
        embossBlend: embossBlend,
        enhance: enhance,
        greyscale: greyscale,
        noise: noise,
        sepia: sepia,
        lightness: lightness,
        luminance: luminance,
        invert: invert,
        kaleidoscope: kaleidoscope,
        mask: mask,
        pixelSize: pixelSize,
        posterize: posterize,
        threshold: threshold,
        draggable: false,
      });

      konvaImage.cache();
      konvaImage.filters([
        Konva.Filters.Blur,
        Konva.Filters.Pixelate,
        Konva.Filters.Emboss,
        Konva.Filters.Enhance,
        Konva.Filters.Invert,
        Konva.Filters.Kaleidoscope,
        Konva.Filters.Mask,
        Konva.Filters.Noise,
        Konva.Filters.Posterize,
        Konva.Filters.Solarize,
        Konva.Filters.Sepia,
      ]);
      // konvaImage.filters([Konva.Filters.Contrast]);
      // konvaImage.filters([Konva.Filters.Emboss]);
      // konvaImage.filters([Konva.Filters.Enhance]);
      // konvaImage.filters([Konva.Filters.HSL]);
      // konvaImage.filters([Konva.Filters.RGB]);
      // konvaImage.filters([Konva.Filters.Invert]);
      // konvaImage.filters([Konva.Filters.Kaleidoscope]);
      // konvaImage.filters([Konva.Filters.Mask]);
      // konvaImage.filters([Konva.Filters.Noise]);
      // konvaImage.filters([Konva.Filters.Posterize]);
      // konvaImage.filters([Konva.Filters.HSV]);
      // konvaImage.filters([Konva.Filters.Solarize]);
      // konvaImage.filters([Konva.Filters.Pixelate]);
      // konvaImage.filters([Konva.Filters.Sepia]);
      // konvaImage.filters([Konva.Filters.Brighten]);

      layer.add(konvaImage);
      stage.add(layer);
    }
  }, [image, blurRadius, pixelSize]);

  function applyFilter() {
    setPixelSize(Number(10));
    setBlurRadius(Number(10));
  }

  
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
      <button id='filter' onClick={() => applyFilter()}>Apply Filter</button>
    </div>
 );
}

export default App;