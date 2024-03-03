import React, { useEffect, useState, useRef, ChangeEvent} from 'react'; // Removed unused useEffect, ChangeEvent
import './App.css';
import Konva from 'konva';


function App() {
//   const [file, setFile] = useState(''); // Store the image URL as a string
  const fileInputRef =useRef<HTMLInputElement | null>(null);; // Correctly initialized the ref with useRef
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [numFilters, setNumFilters] = useState(0);
  const [aesthetic, setAesthetic] = useState<Aesthetic | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [blurRadius, setBlurRadius] = useState(0);
  const [pixelSize, setPixelSize] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [enhance, setEnhance] = useState(0);
  const [greyscale, setGreyscale] = useState(false);
  const [noise, setNoise] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [lightness, setLightness] = useState(0);
  const [luminance, setLuminance] = useState(0);
  const [invert, setInvert] = useState(false);
  const [kaleidoscope, setKaleidoscope] = useState(0);
  const [mask, setMask] = useState(0);
  const [posterize, setPosterize] = useState(0);
  const [solarize, setSolarize] = useState(0);
  const [embossStrength, setEmbossStrength] = useState(0);
  const Dictionaryvar: Record<string, any> = {
    "Blur": setBlurRadius,
    "Pixelate": setPixelSize,
    "Saturation": setSaturation,
    //"Desaturation": setSaturation,
    "Sepia": setSepia,
    "Darken": setBrightness,
    "Kaleidoscope": setKaleidoscope,
    "Contrast": setContrast,
    "Noise": setNoise,
    "Solarize": setSolarize,
    "Emboss": setEmbossStrength,
    "Enhance": setEnhance,
    "Greyscale": setGreyscale,
    "Invert": setInvert,
    "Lightness": setLightness,
    "Luminance": setLuminance,
    "Mask": setMask,
    "Posterize": setPosterize,
    "Saturated": setSaturation,

};
const filterDictionary: Record<string, any> = {
    "Blur": Konva.Filters.Blur,
    "Pixelate": Konva.Filters.Pixelate,
    "Saturation": Konva.Filters.HSL,
    //"Desaturation": Konva.Filters.HSL,
    "Contrast": Konva.Filters.Contrast,
    "Darken": Konva.Filters.Brighten,
    "Sepia": Konva.Filters.Sepia,
    "Kaleidoscope": Konva.Filters.Kaleidoscope,
    "Noise": Konva.Filters.Noise,
    "Solarize": Konva.Filters.Solarize,
    "Emboss": Konva.Filters.Emboss,
    "Enhance": Konva.Filters.Enhance,
    "Greyscale": Konva.Filters.Grayscale,
    "Invert": Konva.Filters.Invert,
    "Lightness": Konva.Filters.HSL,
    "Luminance": Konva.Filters.HSL,
    "Mask": Konva.Filters.Mask,
    "Posterize": Konva.Filters.Posterize,
    "Saturated": Konva.Filters.HSL,

    // add more filters as needed
};
const filterTable: Record<string, number[]> = {
    "Blur": [0, 40],
    "Pixelate": [0, 10],
    "Saturation": [3, 5],
    //"Desaturation": [-3, 0],
    "Contrast": [30, 50],
    "Darken": [-20, -10],
    "Sepia": [0, 100],
    "Kaleidoscope": [0, 360],
    "Noise": [0, 100],
    "Solarize": [0, 100],
    "Emboss": [0, 100],
    "Enhance": [0, 100],
    "Greyscale": [0, 1],
    "Invert": [0, 1],
    "Lightness": [0, 100],
    "Luminance": [0, 100],
    "Mask": [0, 100],
    "Posterize": [0, 100],
    "Saturated": [0, 100],

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
          console.log("Filter: ", this.names[i]);
          Dictionaryvar[this.names[i]](Number(this.filterStrength[i]));
        }
      }
    }
  }

  // const blur = new Aesthetic(['Blur']);
  // const tumblr = new Aesthetic(["Desaturate", "Contrast", 'Darken']);
  // const gothic = new Aesthetic(["Desaturate", "Contrast", 'Darken']);
  // const indie = new Aesthetic(["Desaturate", "Contrast", 'Darken']);
  // const vintage = new Aesthetic(["Desaturate", "Contrast", 'Darken']);
  // const nostalgia = new Aesthetic(["Desaturate", "Contrast", 'Darken']); 
  // const chaos = new Aesthetic(["Desaturate", "Contrast", 'Darken']);


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
  function applyRandomFilters() {
    // Get all filter names
    const allFilterNames = Object.keys(filterDictionary);
  
    // Generate an array of random filter names
    const randomfilters = [];
    for (let i = 0; i < numFilters; i++) {
      const randomIndex = Math.floor(Math.random() * allFilterNames.length);
      randomfilters.push(allFilterNames[randomIndex]);
    }
  
    // Create an Aesthetic object with the random filter names
    const newAesthetic = new Aesthetic(randomfilters);
  
    // Apply the filters
    newAesthetic.applyFilters();

    // Update the aesthetic state variable
    setAesthetic(newAesthetic);
  }
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
        embossStrength: embossStrength,
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
        saturation: saturation,
        solarize: solarize,
        contrast: contrast,
        brightness: brightness,
        draggable: false,
      });

      konvaImage.cache();
      if(aesthetic)
      konvaImage.filters(aesthetic.filters);

      layer.add(originalKonvaImage);
      layer.add(konvaImage);
      stage.add(layer);
      if(aesthetic)
      aesthetic.applyFilters();
    }
  }, [image,aesthetic]);

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
      <input type="number" value={numFilters} onChange={e => setNumFilters(Number(e.target.value))} />
      <button onClick={applyRandomFilters}>Apply Random Filters</button>
    </div>
 );
}

export default App;