const slugify = (text) => {
    // Replace non-alphanumeric characters with a space
    text = text.replace(/[^a-z0-9\u0980-\u09FF]+/gi, ' ');

    // Convert to lowercase
    text = text.toLowerCase();

    // Replace spaces with hyphens
    text = text.replace(/\s+/g, '-');

    // Remove leading and trailing hyphens
    text = text.replace(/^-+/, '').replace(/-+$/, '');

    return text;
}

export default slugify;