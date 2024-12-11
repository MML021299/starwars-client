export const getCharacterNumber = (url) => {
    const dataArray = url.split('/');
    return dataArray[dataArray.length - 2];
};

export const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    if (string === 'n/a') return string.toUpperCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
};  