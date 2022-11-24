import { Utils } from './Utils/Utils.spec';

export const signUpUserData = {
    email: Utils.generateRandomEmail(),
    firstName: Utils.generateRandomCharacterLetters(5),
    lastName: Utils.generateRandomCharacterLetters(5),
    password: Utils.generateRandomCharacterLetters(11),
    dayOfBirth: '5',
    monthOfBirth: '7',
    yearOfBirth: '1991'
};