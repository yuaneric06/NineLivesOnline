import './BlogEntry.css'

export default function BlogEntry(props) {
    const parser = new DOMParser();
    console.log("rendering " + props.title);
    console.log(props);
    console.log(props.content);
    // const contentElements = parser.parseFromString(props.content, "text/html");
    // console.log(contentElements);
    // console.log(contentElements.content);
    const articleString = `<img src=${props.media} alt=${props.mediaAlt}>` + props.content;
    return (
        <main dangerouslySetInnerHTML={{__html: articleString}} />
    )
}