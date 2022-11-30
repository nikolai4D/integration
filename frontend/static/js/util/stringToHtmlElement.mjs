/**
@param string
@returns {element}
*/

const stringToHtmlElement = string =>
{
    const frame = document.createElement( "div" );
    frame.insertAdjacentHTML( "afterbegin", string );
    return frame.firstElementChild;
};

export default stringToHtmlElement;