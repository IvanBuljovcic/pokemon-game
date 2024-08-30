
function arrayMapper(parentArray) {
  const myArray = [];
  
  parentArray.forEach((row, rowIndex) => {
    row.forEach((symbol, columnIndex) => {
      if (!!symbol) {
        myArray.push(
          new Boundary({
            position: {
              x: columnIndex * Boundary.width + offset.x, // index * tile width
              y: rowIndex * Boundary.height + offset.y, // index * tile height
            },
          })
        );
      }
    });
  });

  return myArray;
}