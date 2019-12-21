// spravi request na backend a vrati metadata dokumentu `documentId`
export async function getMetadata(documentId) {
    console.log('getMetadata', documentId);

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

// vrati URL obrazok strany page dokumentu `documentId`
export async function getPage(documentId, page) {
    console.log('getPage', documentId, page);

    if (page < 0) return null;
    return 'https://www.nrsr.sk/web/dynamic/PoslanecPhoto.aspx?PoslanecID=929&random=' + Math.random();
}

/**
 * Returns textual representation from document type code.
 *
 * @param documentType document type code
 * @return {string} human readable textual representation
 */
export function documentTypeName(documentType) {
    switch (documentType) {
        case 'dzp':
            return 'bakalárske práce';
        case 'ddp':
            return 'diplomové práce';
        case 'dpg':
            return 'dizertačne práce';
        case 'drz':
            return 'rigorózne práce';
        default:
            return 'praca ineho typu';
    }
}
