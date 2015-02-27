function SymbolList() {
    this.write_line = 0;
    this.read_line = 0;
    this.read_symbol = 0;
    this.symbols = [];
    this.symbols[0] = [];

    this.current_clef = null;

    this.addClef = function (clef) {
        var newClef = new Clef(clef);

        this.current_clef = newClef;
        this.symbols[this.write_line].push(newClef);
    };

    this.addNote = function (pitch, duration) {
        if (this.current_clef == null) {
            throw 'Cannot add note without clef';
        }

        this.symbols[this.write_line].push(new Note(pitch));
    };

    this.addStaff = function() {
        this.write_line++;
        this.symbols[this.write_line] = [];
    }

    this.done = function() {
        return this.read_line == this.write_line &&
               this.read_symbol >= this.symbols[this.read_line].length;
    }

    this.next = function() {
        if (this.read_symbol >= this.symbols[this.read_line].length) {
            this.read_line++;
        }

        var symbol = this.symbols[this.read_line][this.read_symbol];

        if (symbol instanceof Clef) {
            current_clef = symbol;
        }

        this.read_symbol++;
        return symbol;
    }

    this.reset = function() {
        this.read_line = 0;
        this.read_symbol = 0;
    }
}

function Symbol() {
    this.image = '';
    this.spacing = 0;
    this.width = 0;
    this.height = 0;
    this.is_note = false;

    this.getPosition = null;
}

function Clef(clef_name) {
    Symbol.call(this);

    this.clef_name = clef_name;
    this.middle_c = 0; // The amount of spaces/lines from the middle of the staff

    this.getPosition = function(clef) {
        return 5.8;
    }

    setupClef(this);
}

function setupClef(clef) {
    switch (clef.clef_name) {
        case 'Treble':
            clef.image = '/images/TrebleClef.svg';
            clef.width = 108;
            clef.height = 108;

            clef.spacing = 108;

            clef.middle_c = -6;
            break;
        case 'Bass':
            clef.middle_c = 6;
            break;
        case 'Alto':
            clef.middle_c = 0;
            break;
        case 'Tenor':
            clef.middle_c = 2;
            break;

        default:
            throw clef.clef_name + " is not a valid clef."
    }

    clef.image = '/images/TrebleClef.svg';
}

function Note(pitch) {
    Symbol.call(this);

    this.pitch = pitch;
    //this.duration = duration;
    this.accidental = null;

    this.image = '/images/WholeNote.svg';
    this.height = 25;
    this.width = 25;
    this.spacing = 50;
    this.is_note = true;

    var thisthis = this;

    // Position on the staff
    this.getPosition = function(clef) {
        var letter = thisthis.pitch.slice(0, 1);
        var octave = thisthis.pitch.slice(1, 2);

        octave = octave == '' ? '4' : octave;

        var note_position = letter.charCodeAt() - 'C'.charCodeAt();

        if (note_position < 0) {
            note_position += 7;
        }

        var octave_position = 7*(Number(octave) - 4);

        return octave_position + note_position;
    }

    setupNote(this);
}

function setupNote(note) {
    var acc_symbols = note.pitch.slice(2);
    var acc_name = '';

    switch (acc_symbols) {
        case '':
            return;
        case 'b':
            acc_name = 'Flat';
            break;
        case '#':
            acc_name = 'Sharp';
            break;
        case '##':
            acc_name = 'DoubleSharp';
            break;
        case '###':
            acc_name = 'TripleSharp';
            break;
    }

    note.accidental = new Accidental(acc_name);
}

function Accidental(accidental) {
    Symbol.call(this);

    this.accidental = accidental;
    setupAccidental(this);
}

function setupAccidental(accidental) {
    switch (accidental.accidental) {
        case 'Flat':
        case 'HalfSharp':
        case 'Sharp':
        case 'DoubleSharp':
        case 'TripleSharp':
        case 'Natural':
            console.log('doesn\'t work yet');
            break;
        default:
            throw accidental.accidental + " is not a valid accidental";
    }
}
