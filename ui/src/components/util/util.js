
export default function trimDate(transaction, key) {
    if (key.match(/(.*[dD]ate.*)|(lastModified)/))
        return transaction[key].split('T')[0];
    return transaction[key];
}
