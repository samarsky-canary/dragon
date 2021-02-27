// смещение необходимо из-за зарезервированных id объектов на сцене
const offset = 0;
class Icon {
    constructor(xmlString) {
        this.y = 0;
        this.x = 0;
        this.type = (xmlString.querySelector('type')).innerHTML;
        this.id = xmlString.getAttribute('id') + offset;
        this.next = (this.type !== 'END') ? xmlString.getAttribute('next') + offset : null;
        this.previous = (this.type !== 'BEGIN') ? xmlString.getAttribute('previous') + offset : null;
        this.text = (xmlString.querySelector('text').innerHTML);
        this.isConnected = false;
    }
    setCoordinates(width, height)
    {
        this.y = height;
        this.x = width;
    }
}

class IconIf extends Icon {
    constructor(xmlString) {
        super(xmlString);
        this.alternative = xmlString.getAttribute('alter') + offset;
        this.limit =xmlString.getAttribute('limit') + offset;
    }
}

export {Icon, IconIf}