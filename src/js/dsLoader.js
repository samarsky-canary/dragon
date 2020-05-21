// load diagram from input form
function loadDiagram(elementID) {

    const diagram = elementID.files;
    console.log(diagram.length)
    if (diagram.length == 0) {
       console.log('No file found');
       return;
    }
    // get file
    var file = diagram.item(0);
    alert(file);
    return file;
}

export default loadDiagram;