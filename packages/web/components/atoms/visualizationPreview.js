import { visualizationRoute, thumbnailUrl } from '../../routes/routeGenerators';

export const VisualizationPreview = ({ info, userName }) => (
  <a
    className='visualization-preview'
    title={info.title}
    href={visualizationRoute({ id: info.id, userName })}
    style={{
      'background-image': `url(${thumbnailUrl(info.id)})`
    }}
  />
)
