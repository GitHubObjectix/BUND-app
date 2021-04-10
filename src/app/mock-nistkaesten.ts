import { Nistkasten } from './nistkasten';

export const NISTKAESTEN : Nistkasten[] = [
    {
        id: 1,
        number: '39',
        characteristic: 'Holzbeton, hinten offen',
        position: {
            description: 'Tännig, rechte Seite', 
            lat: 49.819717, description_lat: '49°49.183', lon: 9.818517, description_lon: '009°49.111'}, 
        content: [{year: 2020, content:'irgendwelche Samen, Zeug'}]
    },
    {
        id: 2,
        number: '',
        characteristic: 'Holzbeton',
        position : {
            description: 'Tännig rechte Seite, wo Bäume nicht mehr so dicht stehen',
            description_lat: '49°49.186', description_lon: '009°49.105', lat: 49.819767, lon: 9.818417},
        content: [{year: 2020, content: 'Kacke, Larven, Moos, Federn, Eingang zugekleistert'}]
    },
    {
        id: 3,
        number: '',
        characteristic: 'Holz',
        position: {
            description: 'Tännig, linke Seite',
            description_lat: '49°49.178', description_lon: '009°49.125', lat: 49.819633, lon: 9.81875
        },
        content: [{year: 2020, content: 'Blätter, innen Moos'}]
    }

]
