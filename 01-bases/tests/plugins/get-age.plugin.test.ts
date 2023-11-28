import { getAge } from "../../src/plugins/get-age.plugin";

describe('plugins/get-age.plugin', () => {


    test('getAge() should return the age of a person', () => {

        const bithdate = '1988-03-26';
        const age = getAge(bithdate)

        expect(typeof age).toBe('number');

    });

    test('getAge should return curren age', () => {

        const birthdate = '1988-03-26';
        const age = getAge(birthdate)

        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();

        expect(age).toBe(calculatedAge);

    });

    test('getAge should return 0 years', () => {

        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);
        
        const birthdate = '1995-10-21';
        const age = getAge(birthdate)

        expect( age).toBe(0);
        expect( spy ).toHaveBeenCalled();

    });


});