// // crypto.js (WebCrypto API)

// export async function generateRSAKeyPair() {
//     return await window.crypto.subtle.generateKey(
//         {
//             name: "RSA-OAEP",
//             modulusLength: 2048,
//             publicExponent: new Uint8Array([1, 0, 1]),
//             hash: "SHA-256",
//         },
//         true,
//         ["encrypt", "decrypt"]
//     );
// }

// export async function exportPublicKey(key) {
//     const spki = await crypto.subtle.exportKey("spki", key);
//     return btoa(String.fromCharCode(...new Uint8Array(spki)));
// }

// export async function exportPrivateKey(key) {
//     const pkcs8 = await crypto.subtle.exportKey("pkcs8", key);
//     return btoa(String.fromCharCode(...new Uint8Array(pkcs8)));
// }

// export async function importPublicKey(base64) {
//     const binary = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
//     return crypto.subtle.importKey(
//         "spki",
//         binary,
//         { name: "RSA-OAEP", hash: "SHA-256" },
//         true,
//         ["encrypt"]
//     );
// }

// export async function importPrivateKey(base64) {
//     const binary = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
//     return crypto.subtle.importKey(
//         "pkcs8",
//         binary,
//         { name: "RSA-OAEP", hash: "SHA-256" },
//         true,
//         ["decrypt"]
//     );
// }

// export async function encryptMessage(message, receiverPublicKey) {
//     // 1) generate AES key
//     const aesKey = await crypto.subtle.generateKey(
//         { name: "AES-GCM", length: 256 },
//         true,
//         ["encrypt", "decrypt"]
//     );

//     const iv = crypto.getRandomValues(new Uint8Array(12));

//     // 2) encrypt message with AES
//     const encoded = new TextEncoder().encode(message);
//     const ciphertext = await crypto.subtle.encrypt(
//         { name: "AES-GCM", iv },
//         aesKey,
//         encoded
//     );

//     // 3) export AES key
//     const rawAesKey = await crypto.subtle.exportKey("raw", aesKey);

//     // 4) encrypt AES key with RSA
//     const encKey = await crypto.subtle.encrypt(
//         { name: "RSA-OAEP" },
//         receiverPublicKey,
//         rawAesKey
//     );

//     return {
//         alg: "AES-256-GCM",
//         iv: btoa(String.fromCharCode(...iv)),
//         ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
//         tag: "", // GCM tag is inside ciphertext in WebCrypto
//         encKeyForReceiver: btoa(String.fromCharCode(...new Uint8Array(encKey))),
//     };
// }

// export async function decryptMessage(payload, privateKey) {
//     const iv = Uint8Array.from(atob(payload.iv), c => c.charCodeAt(0));
//     const ciphertext = Uint8Array.from(atob(payload.ciphertext), c => c.charCodeAt(0));
//     const encKey = Uint8Array.from(atob(payload.encKeyForReceiver), c => c.charCodeAt(0));

//     // 1) decrypt AES key
//     const rawAesKey = await crypto.subtle.decrypt(
//         { name: "RSA-OAEP" },
//         privateKey,
//         encKey
//     );

//     const aesKey = await crypto.subtle.importKey(
//         "raw",
//         rawAesKey,
//         { name: "AES-GCM" },
//         false,
//         ["decrypt"]
//     );

//     // 2) decrypt message
//     const plaintext = await crypto.subtle.decrypt(
//         { name: "AES-GCM", iv },
//         aesKey,
//         ciphertext
//     );

//     return new TextDecoder().decode(plaintext);
// }


// --- Base64 helpers (safe for large buffers) ---
export function abToB64(ab) {
    const bytes = new Uint8Array(ab);
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary);
}

function b64ToAb(b64) {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
}

// --- RSA keypair (WebCrypto) ---
export async function generateRSAKeyPair() {
    return crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"],
    );
}

export async function exportPublicKeyB64(publicKey) {
    const spki = await crypto.subtle.exportKey("spki", publicKey);
    return abToB64(spki);
}
export async function exportPrivateKeyB64(privateKey) {
    const pkcs8 = await crypto.subtle.exportKey("pkcs8", privateKey);
    return abToB64(pkcs8);
}
export async function importPublicKeyB64(b64) {
    return crypto.subtle.importKey(
        "spki",
        b64ToAb(b64),
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"],
    );
}
export async function importPrivateKeyB64(b64) {
    return crypto.subtle.importKey(
        "pkcs8",
        b64ToAb(b64),
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"],
    );
}

// --- AES-GCM encrypt/decrypt with separate tag ---
export async function encryptAESGCM(plaintext) {
    const aesKey = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"],
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const data = new TextEncoder().encode(plaintext);

    // WebCrypto returns (ciphertext || tag)
    const ctWithTag = new Uint8Array(
        await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, data),
    );

    const tagLen = 16;
    const ciphertext = ctWithTag.slice(0, ctWithTag.length - tagLen);
    const tag = ctWithTag.slice(ctWithTag.length - tagLen);

    const rawAesKey = await crypto.subtle.exportKey("raw", aesKey);

    return {
        aesKeyRaw: rawAesKey, // ArrayBuffer
        ivB64: abToB64(iv.buffer),
        ciphertextB64: abToB64(ciphertext.buffer),
        tagB64: abToB64(tag.buffer),
    };
}

export async function decryptAESGCM({ ivB64, ciphertextB64, tagB64 }, aesKeyRaw) {
    const iv = new Uint8Array(b64ToAb(ivB64));
    const ciphertext = new Uint8Array(b64ToAb(ciphertextB64));
    const tag = new Uint8Array(b64ToAb(tagB64));

    // re-join ciphertext + tag
    const ctWithTag = new Uint8Array(ciphertext.length + tag.length);
    ctWithTag.set(ciphertext, 0);
    ctWithTag.set(tag, ciphertext.length);

    const aesKey = await crypto.subtle.importKey(
        "raw",
        aesKeyRaw,
        { name: "AES-GCM" },
        false,
        ["decrypt"],
    );

    const pt = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        aesKey,
        ctWithTag,
    );

    return new TextDecoder().decode(pt);
}

export async function rsaEncryptKey(rawAesKey, receiverPublicKey) {
    const enc = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        receiverPublicKey,
        rawAesKey,
    );
    return abToB64(enc);
}

export async function rsaDecryptKey(encKeyB64, myPrivateKey) {
    const raw = await crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        myPrivateKey,
        b64ToAb(encKeyB64),
    );
    return raw; // ArrayBuffer (AES raw key)
}