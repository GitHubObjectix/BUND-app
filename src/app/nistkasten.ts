export interface Position {
    description: string;
    lat: number;
    description_lat: string;
    lon: number;
    description_lon: string;
}

export interface Content
{
    year: number;
    content: string;
}

export interface Nistkasten {
    id: number;                         // eindeutige Kennung
    number: string;                     // Nummeraufdruck auf Kasten
    characteristic: string;
    position: Position;
    content: Content[];
}