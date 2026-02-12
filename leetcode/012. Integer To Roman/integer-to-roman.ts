function intToRoman(num: number): string {
    let output = "";

    if (num >= 3000) {
        output += "MMM";
        num -= 3000;
    }

    if (num >= 2000) {
        output += "MM";
        num -= 2000;
    }

    if (num >= 1000) {
        output += "M";
        num -= 1000;
    }

    if (num >= 900) {
        output += "CM";
        num -= 900;
    }
    
    if (num >= 800) {
        output += "DCCC";
        num -= 800;
    }
    
    if (num >= 700) {
        output += "DCC";
        num -= 700;
    }
    
    if (num >= 600) {
        output += "DC";
        num -= 600;
    }
    
    if (num >= 500) {
        output += "D";
        num -= 500;
    }
    
    if (num >= 400) {
        output += "CD";
        num -= 400;
    }
    
    if (num >= 300) {
        output += "CCC";
        num -= 300;
    }
    
    if (num >= 200) {
        output += "CC";
        num -= 200;
    }
    
    if (num >= 100) {
        output += "C";
        num -= 100;
    }
    
    if (num >= 90) {
        output += "XC";
        num -= 90;
    }
    
    if (num >= 80) {
        output += "LXXX";
        num -= 80;
    }
    
    if (num >= 70) {
        output += "LXX";
        num -= 70;
    }
    
    if (num >= 60) {
        output += "LX";
        num -= 60;
    }
    
    if (num >= 50) {
        output += "L";
        num -= 50;
    }
    
    if (num >= 40) {
        output += "XL";
        num -= 40;
    }
    
    if (num >= 30) {
        output += "XXX";
        num -= 30;
    }
    
    if (num >= 20) {
        output += "XX";
        num -= 20;
    }
    
    if (num >= 10) {
        output += "X";
        num -= 10;
    }
    
    if (num >= 9) {
        output += "IX";
        num -= 9;
    }
    
    if (num >= 8) {
        output += "VIII";
        num -= 8;
    }
    
    if (num >= 7) {
        output += "VII";
        num -= 7;
    }
    
    if (num >= 6) {
        output += "VI";
        num -= 6;
    }
    
    if (num >= 5) {
        output += "V";
        num -= 5;
    }
    
    if (num >= 4) {
        output += "IV";
        num -= 4;
    }
    
    if (num >= 3) {
        output += "III";
        num -= 3;
    }
    
    if (num >= 2) {
        output += "II";
        num -= 2;
    }
    
    if (num >= 1) {
        output += "I";
        num -= 1;
    }

    return output;
};
