"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TableroHangmanComponent = TableroHangmanComponent_1 = (function () {
    /*public callbackLetra() {
        console.log(this.letrasError)
        return this.letrasError;
    }
    public _callbackLetra() {
        this.callbackLetra();
    };

    private callbackAddLetra = this._callbackLetra.bind(this);
*/
    function TableroHangmanComponent() {
        this.pelicula = "";
        this.oculta = "";
        this.adivina = "";
        this.peliculas = ["buscando a nemo", "kunfu panda", "big hero 6", "cars", "turbo", "toy story", "peter pan"];
        this.peliculas = String.prototype.toUpperCase.apply(this.peliculas).split(",");
    }
    TableroHangmanComponent.prototype.ngOnInit = function () {
        var random = Math.floor(Math.random() * this.peliculas.length - 1) + 1;
        this.pelicula = this.peliculas[random];
        if (!this.pelicula)
            return;
        console.log(this.pelicula);
        var palabrasPeli = this.pelicula.split(" ");
        for (var i = 0; i < palabrasPeli.length; i++) {
            for (var j = 0; j < palabrasPeli[i].length; j++) {
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
            if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode === 192) {
                this.compruebaLetra(e.key);
            }
        }.bind(this));
    };
    TableroHangmanComponent.prototype.compruebaLetra = function (key) {
        if (this.pelicula.indexOf(key.toUpperCase()) > -1) {
            this.completaPeli(key.toUpperCase());
        }
        else {
            this.addLetraError(key.toUpperCase());
        }
    };
    TableroHangmanComponent.prototype.completaPeli = function (key) {
        for (var i = 0; i < this.oculta.length; i++) {
            if (this.oculta[i] === key) {
                this.adivina = this.adivina.substr(0, i) + key + this.adivina.substr(i + 1);
            }
        }
    };
    TableroHangmanComponent.prototype.addLetraError = function (key) {
        if (TableroHangmanComponent_1.letrasError.indexOf(key) < 0) {
            TableroHangmanComponent_1.letrasError.push(key);
        }
    };
    return TableroHangmanComponent;
}());
TableroHangmanComponent.letrasError = [];
TableroHangmanComponent = TableroHangmanComponent_1 = __decorate([
    core_1.Component({
        selector: 'tablero-hangman',
        templateUrl: 'app/views/tablero-hangman.html',
    }),
    __metadata("design:paramtypes", [])
], TableroHangmanComponent);
exports.TableroHangmanComponent = TableroHangmanComponent;
var TableroHangmanComponent_1;
//# sourceMappingURL=tablero-hangman.js.map