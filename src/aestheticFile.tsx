// import React, {useState} from "react";
// import App from "./App";
// import Konva from "konva";


// const AestheticFile = () => {

//     const [image, setImage] = useState<HTMLImageElement | null>(null);
//     const [blurRadius, setBlurRadius] = useState(0);
//     const [pixelSize, setPixelSize] = useState(0);
//     const [brightness, setBrightness] = useState(0);
//     const [contrast, setContrast] = useState(0);
//     const [enhance, setEnhance] = useState(0);
//     const [greyscale, setGreyscale] = useState(false);
//     const [hue, setHue] = useState(0);
//     const [noise, setNoise] = useState(0);
//     const [saturation, setSaturation] = useState(0);
//     const [sepia, setSepia] = useState(0);
//     const [value, setValue] = useState(0);
//     const [lightness, setLightness] = useState(0);
//     const [luminance, setLuminance] = useState(0);
//     const [invert, setInvert] = useState(false);
//     const [kaleidoscope, setKaleidoscope] = useState(0);
//     const [mask, setMask] = useState(0);
//     const [posterize, setPosterize] = useState(0);
//     const [threshold, setThreshold] = useState(0);
//     const [solarize, setSolarize] = useState(0);
//     const [embossStrength, setEmbossStrength] = useState(0);

//     const Dictionaryvar: Record<string, any> = {
//         "Blur": setBlurRadius,
//         "Pixelate": setPixelSize,
//         "Saturation": setSaturation,
//         "Desaturation": setSaturation,
//         "Sepia": setSepia,
//         "Kaleidoscope": setKaleidoscope,
//         "Contrast": setContrast,
//     };
//     const filterDictionary: Record<string, any> = {
//         "Blur": Konva.Filters.Blur,
//         "Pixelate": Konva.Filters.Pixelate,
//         "Saturation": Konva.Filters.HSL,
//         "Desaturation": Konva.Filters.HSL,
//         "Hue": Konva.Filters.HSL,
//         "Sepia": Konva.Filters.Sepia,
//         "Kaleidoscope": Konva.Filters.Kaleidoscope,
//         // add more filters as needed
//     };
//     const filterTable: Record<string, number[]> = {
//         "Blur": [0, 40],
//         "Pixelate": [0, 10],
//         "Saturation": [3, 5],
//         "Desaturation": [-3, 0],
//         "Hue": [0, 250],
//         "Sepia": [0, 100],
//         "Kaleidoscope": [0, 360],
//         // add more filters as needed
//     };
//     function filterMapper(filter: string) {
//         return filterDictionary[filter];
//     }
//     // function filterstrengthMapper(filter: string) {
//     //   return filterTable[filter];
//     // }

//     function randomFilterStrength(filter: string) {
//         if (!(filter in filterTable)) {
//             console.error(`Invalid filter: ${filter}`);
//             return 0;
//         }
//         return Math.floor(Math.random() * (filterTable[filter][1] - filterTable[filter][0] + 1) + filterTable[filter][0]);
//     }
//     class Aesthetic {
//         names: Array<string>;
//         filters: Array<any>;
//         filterStrength: Array<number>;

//         constructor(names: Array<string> = []) {
//             this.filters = [];
//             this.names = names;
//             this.names.forEach(element => {
//                 this.filters.push(filterMapper(element));
//             }
//             );
//             this.filterStrength = [];
//             this.names.forEach(element => {

//                 this.filterStrength.push(Number(randomFilterStrength(element)));
//             });


//         }
//         applyFilters() {
//             for (let i = 0; i < this.filters.length; i++) {
//                 if (this.filterStrength[i] != 0) {
//                     console.log("filterStrength ", this.filterStrength[i]);
//                     console.log("I: ", i);
//                     Dictionaryvar[this.names[i]](Number(this.filterStrength[i]));
//                 }
//             }
//         }
//     }

//     const tumblr = new Aesthetic([
//         "Desaturation",

//     ]);
//     return (
//         <div>
//             <AestheticFile />
//         </div>
//     );
// }

// export default AestheticFile;