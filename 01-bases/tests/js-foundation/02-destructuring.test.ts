import { characters } from './../../src/js-foundation/02-destructuring';
characters



describe('js-foundation/02-destructuring', () => {

    test('charactes should contain Flash, Superman', () => {

        expect(characters).toContain('Flash');
        expect(characters).toContain('Superman');

    });

    test('fist caracter should be Flash, and second Superman', () => {
        const [flash, superman] = characters;

        expect(flash).toBe('Flash');
        expect(superman).toBe('Superman');

    });

}); 