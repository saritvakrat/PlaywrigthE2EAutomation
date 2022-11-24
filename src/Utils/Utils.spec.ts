export class Utils {

     /**
     * Generate random string specified length with extra characters.
     * By default, generator using next chars:
     * 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
     *
     * @param {number} length Length of generated string
     * @param {string} [chars=''] Extra chars what would used for generating.
     * @returns {string}
     * @memberof Utils
     */
    static generateRandomCharacterLetters(length: number, chars = ''): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' + chars;

        do {
            text = '';
            for (let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
        } while (!(/[a-z]/.test(text) && /[A-Z]/.test(text)) && text.length > 2);
        return text;
    }

       /**
     * Generate random email
     *
     * @returns {string}
     * @memberof Utils
     */
    static generateRandomEmail(): string {
        return 'automation-' + this.generateRandomCharacterLetters(11).toLowerCase() + '-test@gmail.com';
    }
    
}

    

