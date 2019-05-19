

export default (merge) => 
    merge({
        customizeArray(a, b, key) {
            if (key === 'extensions') {
            return b;
            }
    
            // Fall back to default merging
            return undefined;
        },
        customizeObject(a, b, key) {
            //Fall back to default merging
            return undefined;
        }
    });

