const baseUrl = 'http://158.195.10.50:8080'; // bez lomky na konci

// spravi request na backend a vrati metadata dokumentu `documentId`
export async function getMetadata(documentId) {
    const resp = await fetch(`${baseUrl}/metadata?praca=${documentId}`);
    const text = await resp.text();
    if (text.trim() === '') {
        throw Error("Invalid document id or specified document does not exist!");
    }

    const props = Object.fromEntries(text.split("\n")
        .map(it => it.trim())
        .filter(it => it !== '')
        .map(it => it.split(":").map(it => it.trim())));

    console.log(props);

    return {
        pages: props['Pages'],
        title: '',
        author: props['Author'],
        type: 'drz',
    }
}

// vrati URL obrazok strany page dokumentu `documentId`
export async function getPage(documentId, page) {
    console.log('getPage', documentId, page);

    if (page < 0) return null;
    return `${baseUrl}/index?praca=${documentId}&strana=${(1+page).toString().padStart(3, '0')}`;
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
