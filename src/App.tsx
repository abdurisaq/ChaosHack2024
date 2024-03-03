import React, { useEffect, useState, useRef, ChangeEvent} from 'react'; // Removed unused useEffect, ChangeEvent
import './App.css';
import Konva from 'konva';


function App() {
//   const [file, setFile] = useState(''); // Store the image URL as a string
  const fileInputRef =useRef<HTMLInputElement | null>(null);; // Correctly initialized the ref with useRef
  const [selectedOption, setSelectedOption] = useState<string>('');
  
  //const [file, setFile] = useState<string | undefined>();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [blurRadius, setBlurRadius] = useState(0);
  const [pixelSize, setPixelSize] = useState(0);
  // const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  // const [enhance, setEnhance] = useState(0);
  // const [greyscale, setGreyscale] = useState(false);
  // const [hue, setHue] = useState(0);
  // const [noise, setNoise] = useState(0);
  // const [saturation, setSaturation] = useState(0);
  const [sepia, setSepia] = useState(0);
  // const [value, setValue] = useState(0);
  // const [lightness, setLightness] = useState(0);
  // const [luminance, setLuminance] = useState(0);
  // const [invert, setInvert] = useState(false);
  const [kaleidoscope, setKaleidoscope] = useState(0);
  // const [mask, setMask] = useState(0);
  // const [posterize, setPosterize] = useState(0);
  // const [threshold, setThreshold] = useState(0);
  // const [solarize, setSolarize] = useState(0);
  // const [embossStrength, setEmbossStrength] = useState(0);
  const Dictionaryvar: Record<string, any> = {
    "Blur" : setBlurRadius,
    "Pixelate" : setPixelSize,
    "Sepia" : setSepia,
    "Kaleidoscope" : setKaleidoscope,
    "Contrast" : setContrast,
    
  };
  const filterDictionary: Record<string, any> = {
    "Blur": Konva.Filters.Blur,
    "Pixelate": Konva.Filters.Pixelate,
    "Sepia": Konva.Filters.Sepia,
    "Kaleidoscope": Konva.Filters.Kaleidoscope,
    // add more filters as needed
  };
  const filterTable: Record<string, number[]> = {
    "Blur": [0, 40],
    "Pixelate": [0, 10],
    "Sepia": [0, 0],
    "Kaleidoscope": [0, 0],
    // add more filters as needed
  };
  function filterMapper(filter: string) {
    return filterDictionary[filter];
  }
  // function filterstrengthMapper(filter: string) {
  //   return filterTable[filter];
  // }

   function randomFilterStrength(filter: string) {
    if (!(filter in filterTable)) {
      console.error(`Invalid filter: ${filter}`);
      return 0;
    }
    return Math.floor(Math.random() * (filterTable[filter][1] - filterTable[filter][0] + 1) + filterTable[filter][0]);
  }
  class Aesthetic {
    names : Array<string>;
    filters : Array<any>;
    filterStrength : Array<number>;
    
    constructor(names: Array<string> = []) {
      this.filters = [];
      this.names = names;
      this.names.forEach(element => {
        this.filters.push(filterMapper(element));
      }
      );
      this.filterStrength = [];
      this.names.forEach(element => {
    
        this.filterStrength.push(Number(randomFilterStrength(element)));
      });
      

    }
    applyFilters() {
      for(let i =0; i<this.filters.length; i++) {
        if(this.filterStrength[i] != 0) {
          console.log("filterStrength ", this.filterStrength[i]);
          console.log("I: ", i);
          Dictionaryvar[this.names[i]](Number(this.filterStrength[i]));
        }
      }
    }

  }

  const blur = new Aesthetic(['Blur']);
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
        width: 800,
        height: 400,
        
      });

      const layer = new Konva.Layer();

      const originalKonvaImage = new Konva.Image({
        image: image,
        x: 0, // Positioned at the left side
        y: (stage.height() - 400) / 2, // Centered vertically
        width: 400,
        height: 400,
      });

      const konvaImage = new Konva.Image({
        image: image,
        x: 400,
        y: (stage.height() - 400) / 2,
        width: 400,
        height: 400,
        blurRadius: blurRadius,
        embossBlend: true,
        embossDirection: 'top-left',
        //embossStrength: embossStrength,
        //enhance: enhance,
        //greyscale: greyscale,
        //noise: noise,
        sepia: sepia,
        //lightness: lightness,
        //luminance: luminance,
        //invert: invert,
        kaleidoscope: kaleidoscope,
        //mask: mask,
        pixelSize: pixelSize,
        //posterize: posterize,
        //threshold: threshold,
        draggable: false,
      });

      konvaImage.cache();
      konvaImage.filters(blur.filters);
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

      layer.add(originalKonvaImage);
      layer.add(konvaImage);
      stage.add(layer);
      blur.applyFilters();
    }
  }, [image,blurRadius, pixelSize, sepia, kaleidoscope,  contrast]);

function applyFilter() {
  const newPixelSize = 10;
  const newBlurRadius = 10;
  setPixelSize(newPixelSize);
  setBlurRadius(newBlurRadius);
}

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    console.log("Selected option:", selectedOption);
  };

  
  return (
    <div className="App">
      <div className="background-image top"></div>
      <div className="background-image bottom"></div>
      <div id="container"></div>
      <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
        Upload Image
      </button> 
      <input
        type="file"
        onChange={handleChange} // Fixed to use the handleChange function
        ref={fileInputRef} // Fixed the ref to use the useRef hook correctly
        style={{ display: 'none' }} // Hide the input element
      />
        <div className="dropdown">
        <select onChange={handleDropdownChange} value={selectedOption}>
          <option value="">Select an option</option>
          <option value="option1">2014 Tumblr</option>
          <option value="option2">American Gothic</option>
          <option value="option3">IndieKid</option>
          <option value="option3">Vintage</option>
          <option value="option3">Nostalgia Core</option>
          <option value="option3">Complete Chaos</option>
        </select>
      </div>

      <button id='filter' onClick={() => applyFilter()}>Apply Filter</button>
    </div>
 );
}

export default App;