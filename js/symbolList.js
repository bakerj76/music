function SymbolList() {
    this.symbols = [];
    this.addClef = function () {

    };

    this.addNote = function () {

    };
}

function Symbol() {
    this.image = null;
    this.spacing = 0;
}

function Clef(clef_name) {
    Symbol.call(this);

    this.clef_name = clef_name;
    this.middle_c = -1;
}

Clef.calculateMiddleC = function() {
    switch(this.clef_name) {
        case 'Treble':
            return -6;
        case 'Bass':
            return 6;
        case 'Alto':
            return 0;
        case 'Tenor':
            return 2;
    }
}

function Note(pitch) {
    Symbol.call(this);

    this.pitch = pitch;
}
