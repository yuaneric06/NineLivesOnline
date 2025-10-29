import { BrowserRouter, Routes, Route } from 'react-router'
import Blog from './Blog.jsx'
import { blogText } from './blogText.js'
import BlogEntry from './BlogEntry.jsx'

export default function BlogRoutes() {
    /**
     * import url and content from blogText, map them and pass to BlogEntry
     */
    const blogRoutes = blogText.map(obj => {
        console.log(obj.url);
        return <Route path={obj.url} element={<BlogEntry title={obj.title} />} />
    })

    return (
        <>
            <Route path="/blog" element={<Blog />} />
            {blogRoutes}
        </>
    )
}