export interface Position {
    description: string;
    lat: number;
    lon: number;
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
    distance?: number;
}

export interface Comment {
    // timestamp of when the comment was made
    timestamp: Date;
    // type of comment, 0 - text, 1 - image
    type: number;
    // content of comment
    // type 0: actual comment text
    // type 1: url to image file
    content: string;
}
