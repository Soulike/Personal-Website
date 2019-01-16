import crypto from 'crypto';

export default {
    getHash
};

function getHash(text, hashMethod)
{
    const hash = crypto.createHash(hashMethod);
    hash.update(text);
    return hash.digest('hex');
}
