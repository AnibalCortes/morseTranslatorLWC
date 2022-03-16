import { LightningElement } from "lwc";

export default class MorseTranslator extends LightningElement {
  traducido = "";
  texto = "";
  alfabetoMorse = {
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----."
  };

  detectLanguage() {
    if (
      /^[.-]{1,5}(?:[ \t]+[.-]{1,5})*(?:[ \t]+[.-]{1,5}(?:[ \t]+[.-]{1,5}) *)*$/.test(
        this.texto
      )
    ) {
      return "Morse";
    }
    return "Español";
  }

  handleChange(event) {
    var language;
    this.texto = event.detail.value;
    this.traducido = "";
    language = this.detectLanguage();
    if (language === "Morse") {
      this.translateToSpanish();
    } else {
      this.translateToMorse();
    }
  }

  translateToMorse() {
    var palabras = this.texto.toLowerCase().split(" ");
    palabras.forEach((palabra) => {
      for (let i = 0; i < palabra.length; i++) {
        if (this.alfabetoMorse[palabra.charAt(i)] !== undefined) {
          this.traducido += this.alfabetoMorse[palabra.charAt(i)];
        }
      }
      this.traducido += " ";
    });
  }

  translateToSpanish() {
    var palabras = this.texto.split("  ");
    palabras.forEach((palabra) => {
      var letras = palabra.split(" ");
      letras.forEach((letra) => {
        if (
          Object.keys(this.alfabetoMorse).find(
            (key) => this.alfabetoMorse[key] === letra
          ) !== undefined
        ) {
          this.traducido += Object.keys(this.alfabetoMorse).find(
            (key) => this.alfabetoMorse[key] === letra
          );
        }
      });
      this.traducido += " ";
    });
  }
}
