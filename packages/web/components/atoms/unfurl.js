export const Unfurl = ({ title, description, image, url }) => (
  <React.Fragment>
    <meta name='twitter:url' value={url} />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:site' value='@datavis_tech' />
    <meta name='twitter:title' value={title} />
    <meta name='twitter:description' value={description} />
    <meta name='twitter:image' content={image} />
    <meta name='twitter:domain' value='vizhub.com' />

    <meta property='og:url' content={url}/>
    <meta property='og:title' content={title} />
    <meta property='og:description' content={description} />
    <meta property='og:image' content={image} />
    <meta property='og:site_name' content='VizHub'/>
  </React.Fragment>
)
