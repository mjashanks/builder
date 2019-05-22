

module.exports = (merge) => 
    merge.smartStrategy(
        {
            'resolve.extensions': 'replace',
            'module.rules': 'replace',
            'plugins': 'replace',
            'optimization': 'replace'
        }
    );

