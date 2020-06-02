import '../css/style.sass';
import {mxCell, mxGraph,mxClient,mxConstants,mxRubberband,mxXmlRequest, defineCellStyles} from "./mxGraphDeclaration";
import {Icon, IconIf} from "./Icon";

// инстанцируем область для рисования
const graph = new mxGraph(document.getElementById('graph-container'));
new mxRubberband(graph);
// определяем стиль икон
defineCellStyles(graph);
// базовый родитель
const parent = graph.getDefaultParent();

function main() {
    if (!mxClient.isBrowserSupported) {
        alert('mxGraph library not supported by this browser');
    } else {
        //TODO: ДЕБАЖНЫЙ ЗАГРУЗЧИК
        // Production: убрать
        debugHandleFile();
    }
};
main()

/**
 * Настраиваем input-file элемент и привязываем его к кнопке
 * это позволит в будущем кастомизировать кнопку
 */
const loadInput = document.getElementById('hOpenInput');
    loadInput.addEventListener('input',handleFiles,false);
document.getElementById('hOpen')
    .addEventListener('click', () => loadInput.click());

/**
 *  Функция обработчик загрузки xml файла
 */
function handleFiles(file ='') {
    const files = this.files;
    if(files.length != 1)
    {
        console.log('User sent more that 1 file or none')
        return;
    }
    files[0].text().then(text => FileParser(text));
}

function debugHandleFile() {
    var source = '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<Icons>\n' +
        '  <icon id="1" previous="" next="3">\n' +
        '    <type>BEGIN</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '  <icon id="3" previous="1" next="4">\n' +
        '    <type>EMPTY</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '  <icon id="4" previous="3" next="5">\n' +
        '    <type>ACTION</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '  <icon id="5" previous="4" next="6">\n' +
        '    <type>EMPTY</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '  <icon id="6" previous="5" next="7" alter="10" limit="8">\n' +
        '    <type>IF_ELSE</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '  <icon id="7" previous="6" next="8">\n' +
        '    <type>EMPTY</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '  <icon id="8" previous="7" next="9">\n' +
        '    <type>IF_ELSE_LIMIT</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '  <icon id="9" previous="8" next="2">\n' +
        '    <type>EMPTY</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '  <icon id="2" previous="9" next="">\n' +
        '    <type>END</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '  <icon id="10" previous="6" next="8">\n' +
        '    <type>EMPTY</type>\n' +
        '    <text />\n' +
        '  </icon>\n' +
        '</Icons>';
    FileParser(source);
    let filename = 'dragon1.xml';
    document.getElementById('openedFilename').textContent = `Opened: ${filename}`;
}

function fetchIcons(text) {
    var xDoc = new DOMParser();
    const doc = xDoc.parseFromString(text,'text/xml');
    return doc.querySelectorAll('icon');
}

// Parse specific XML file with dragon scheme
function FileParser(text) {

    const iconsDOM = fetchIcons(text);
    let icons = new Map();

    function ExtractIconData() {
        for (let i = 0; i < iconsDOM.length; i++) {
            let tmplIcon = new Icon(iconsDOM[i]);
            if (tmplIcon.type === 'IF_ELSE') {
                tmplIcon = new IconIf(iconsDOM[i])
            }
            icons.set(tmplIcon.id, tmplIcon);
        }
    }
    ExtractIconData();


    graph.getModel().beginUpdate();
    const startX = 60, startY = 50;
    for (const [key, icon] of icons)
    {
        if (icon.previous) {
            icon.y = icons.get(icon.previous).y + startY;
        }
        if (icon.type === 'IF_ELSE') {
            icons.get(icon.alternative).x += startX * 3;
        }
        graph.insertVertex(parent,icon.id,icon.type,icon.x,icon.y,80,30,icon.type);
    }

    for (const [key, icon] of icons) {
        const dad = graph.getModel().getCell(icon.id);
        let child = graph.getModel().getCell(icon.next);
        if (child) {
            graph.insertEdge(parent,'','',dad, child,'endArrow=null');
        }
        if (icon.type === 'IF_ELSE') {
            child = graph.getModel().getCell(icon.alternative);
            graph.insertEdge(parent,'','',dad, child, 'endArrow=null');
        }
    }
    graph.getModel().endUpdate();


}
