const values = [{ name: 'name', _id: 'label' }];

let a = values.map(({ name, _id }) => {
    return { label: name, value: _id };
});

console.log(a);
