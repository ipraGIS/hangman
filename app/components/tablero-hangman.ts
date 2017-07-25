import { Component, Input, OnInit, Injectable } from '@angular/core';
import { ImagenHangmanComponent } from './imagen-hangman';

@Component({
    selector: 'tablero-hangman',
    templateUrl: 'app/views/tablero-hangman.html',
    //providers: [ImagenHangmanComponent]
})

export class TableroHangmanComponent implements OnInit {
    public peliculas: Array<string>;
    public oculta: string = "";
    public adivina: string = "";
    private solucion: string = "";
    //private ganador = false;
    private classInputResolver;
    private classModalResolver;

    static pelicula: string = "";
    static letrasError: Array<string> = [];


    /*public callbackLetra() {
        console.log(this.letrasError)
        return this.letrasError;
    }
    public _callbackLetra() {
        this.callbackLetra();
    };

    private callbackAddLetra = this._callbackLetra.bind(this);
*/
    constructor() {
        this.peliculas = ["buscando a nemo", "kunfu panda", "big hero 6", "cars", "turbo", "toy story", "peter pan"];
        this.peliculas = String.prototype.toUpperCase.apply(this.peliculas).split(",");
        this.classInputResolver = "oculto";
        this.classModalResolver = "oculto";
    }


    ngOnInit() {
        let random = Math.floor(Math.random() * this.peliculas.length - 1) + 1
        TableroHangmanComponent.pelicula = this.peliculas[random];
        if (!TableroHangmanComponent.pelicula)
            return;
        if(TableroHangmanComponent.pelicula.length>14 && TableroHangmanComponent.pelicula.length<20){
            let ad = document.getElementById("adivina") as any;
            let reduccion = 15*(TableroHangmanComponent.pelicula.length-14);
            document.getElementById("adivina").style.fontSize= (200-reduccion) + "%";
        }else if (TableroHangmanComponent.pelicula.length>=20){
            document.getElementById("adivina").style.fontSize= "16px";
        }
        console.log(TableroHangmanComponent.pelicula);
        let palabrasPeli: String[] = TableroHangmanComponent.pelicula.split(" ");

        for (let i = 0; i < palabrasPeli.length; i++) {
            for (let j = 0; j < palabrasPeli[i].length; j++) {
                this.adivina += "_ ";
                this.oculta += palabrasPeli[i][j];
                this.oculta += " ";
            }
            if (palabrasPeli.length > 1) {
                this.adivina += "/";
                this.oculta += "/";
            }
        }
        this.adivina = this.adivina.substring(0, this.adivina.length - 1);
        this.oculta = this.oculta.substring(0, this.oculta.length - 1);

        //document.getElementById("inputLetra").addEventListener('keyup', this.escribeLetra.bind(this), false);

        document.getElementById("inputLetra").addEventListener('keyup', function (e) {
            if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode === 192) {// para la ñ
                this.compruebaLetra(e.key);
            }
        }.bind(this));
    }

    private compruebaLetra(key) {
        if (TableroHangmanComponent.pelicula.indexOf(key.toUpperCase()) > -1) {
            this.completaPeli(key.toUpperCase());
        } else {
            this.addLetraError(key.toUpperCase());
        }
        let input = document.getElementById("inputLetra") as any;
        input.value= "";
    }
    private completaPeli(key) {

        for (let i = 0; i < this.oculta.length; i++) {
            if (this.oculta[i] === key) {
                this.adivina = this.adivina.substr(0, i) + key + this.adivina.substr(i + 1);
            }
        }
    }
    private addLetraError(key) {
        if (TableroHangmanComponent.letrasError.indexOf(key) < 0) {
            TableroHangmanComponent.letrasError.push(key);
        }

    }

    resolver(event) {
        console.log("resolver tablero?");
        //let oculto = this.classInputResolver === "oculto" ? true : false;
        //if(!oculto){
        //  this.classInputResolver = "visible";
        //}

        document.getElementById("ventanaModal").style.visibility = "visible";
        //this.classModalResolver += " visible";

    }

    checkSolucion() {
        if (this.solucion.toUpperCase() === TableroHangmanComponent.pelicula) {
            //this.ganador = true;
            let imagenHangman = new ImagenHangmanComponent();
            imagenHangman._ganador = true;
            imagenHangman.insertaImagen();
            console.log(imagenHangman.ahorcadoSrc);
        }
        this.cerrar();
    }


    cerrar() {
        document.getElementById("ventanaModal").style.visibility = "hidden";
        this.classInputResolver = "oculto";
    }

}