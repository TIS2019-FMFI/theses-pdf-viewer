// api volania

export async function getMetadata(documentId) {
    return {
        pages: 35,
        title: 'Verejná správa a jej charakteristické črty',
        author: 'Danko Andrej',
        type: 'drz',
        chapters: [
            {
                name: 'Uvod',
                pages: [0, 10]
            },
            {
                name: 'Jadro',
                pages: [11, 20]
            },
            {
                name: 'Zaver',
                pages: [20, 35]
            }
        ]
    }
}

export async function getPage(documentId, page) {
    return 'https://www.nrsr.sk/web/dynamic/PoslanecPhoto.aspx?PoslanecID=929';
}

export function documentTypeName(documentType) {
    switch (documentType) {
        case 'dzp': return 'bakalárske práce';
        case 'ddp': return 'diplomové práce';
        case 'dpg': return 'dizertačne práce';
        case 'drz': return 'rigorózne práce';
        default: return 'praca ineho typu';
    }
}