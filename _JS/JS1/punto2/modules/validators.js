// FIXES: Exported correctly, added specific validators for text and numbers.

export const validators = {
    text: (value) => {
        return value.trim().length >= 3;
    },
    
    number: (value) => {
        return !isNaN(value) && value.trim() !== '';
    }
};
