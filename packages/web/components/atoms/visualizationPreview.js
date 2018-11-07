import { visualizationRoute, thumbnailUrl } from '../../routes/routeGenerators';

export const VisualizationPreview = ({ info, userName }) => (
  <a
    className='visualization-preview'
    title={info.title}
    href={visualizationRoute({ id: info.id, userName })}
  >
    <div
      className='visualization-preview-image'
      style={{
        backgroundImage: `url(${thumbnailUrl(info.id)})`

        // For local testing:
        //'background-image': `url(https://vizhub.com/api/visualization/thumbnail/4f92c793909f48d28012e43ddab716df.png)`
      }}
    />
    <div className='visualization-preview-title'>
      { info.title }
    </div>
  </a>
)
