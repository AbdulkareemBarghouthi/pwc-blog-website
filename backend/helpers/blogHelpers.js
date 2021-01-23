const handleUserSelectedOptions = (options)=>{
    return options? options.split(',').join(' '): '';
}

module.exports = {
    handleUserSelectedOptions
};