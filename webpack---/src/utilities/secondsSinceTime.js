export const secondsSinceTime = (timeValue) => {
    if (timeValue) {
        return Math.round((new Date().getTime() - timeValue) / 1000);
    }

    return null;
};