import React from 'react';
import Router from 'next/router';
import Page from '../../components/page';
import { BodyAuthenticated, BodyNotAuthenticated } from './body';
import { visualizationRoute } from '../../routes/routeGenerators';
import { TitledPage } from '../../components/atoms/titledPage';
import { ActionBox } from '../../components/molecules/actionBox';
import { NavBar } from '../../components/organisms/navBar';
import { getJSON } from '../../utils/getJSON';

const templateIds = {
  '86a75dc8bdbe4965ba353a79d4bd44c8': true, // Hello VizHub
  '366c38ba5ebc4631b4bd936f3b709744': true, // Shapes with SVG
  'be771477cb974c938cd8603dd8b59d32': true, // Face
  'dd44f8fcdc8346ff90bddd63572bf638': true, // Making a Bar Chart
  'a44b38541b6e47a4afdd2dfe67a302c5': true, // Customizing Axes
  'a9ec621b1c36439aa2a65e0c28462d7a': true, // Ordinal Scatter
  '9247d4d42df74185980f7b1f7504dcc5': true, // Cars Scatter
  '012b5b20ce894b0fa7dc98ef3a0b43a5': true, // Line Chart
  '900cb204023748b9a8bdf2273bdefe03': true, // Area Chart
  '4f92c793909f48d28012e43ddab716df': true, // Tree
  '92c34f62c0f948e89e87d28907c08715': true, // Color and Size Legends
  'd5ad96d1fe8148bd827a25230cc0f083': true, // Choropleth Map
  '5c907e49d0294538aad03ad1f41e1e28': true, // Choropleth Map with Interactive Filtering
  '98ba4daacc92442f8d9fd7d91bfd712a': true, // Scatter Plot with Menus
  '2546209d161e4294802c4ac0098bebc2': true, // Line Chart with Multiple Lines
  'ecb0793c7d674100b3e3133d92cb6957': true, // Melting Data for Multiple Lines
  '501f3fe24cfb4e6785ac75008b530a83': true, // Selecting a Year on a Line Chart
  'b6de507a869d4e0581fd8a652b786a7e': true, // Map with Selectable Countries
};

export default class extends Page {
  static async getInitialProps({req}) {
    const props = await super.getInitialProps({ req });

    const url = 'https://vizhub.com/api/visualization/metadata';
    const metadata = await (await fetch(url)).json();

    //const metadata = await getJSON(`/api/visualization/metadata`, req);;

    props.templates = metadata.filter(info => templateIds[info.id]);
    
    return props;
  }
  constructor() {
    super();

    this.createVisualizationFromScratch = (
      this.createVisualizationFromScratch.bind(this)
    );
  }

  createVisualizationFromScratch() {
    fetch('/api/visualization/create', { credentials: 'include' })
      .then(r => r.json())
      .then(({id, error}) => {
        if (error) {
          console.log(error);
        } else {
          const userName = this.props.user.userName;
          Router.push(visualizationRoute({id, userName}));
        }
      });
  }

  render() {
    return (
      <TitledPage title='Create Visualization'>
        <NavBar
          user={this.props.user}
          csrfToken={this.props.csrfToken}
        />
        <ActionBox title='Create a Visualization'>
          {
            this.props.user
              ? (
                <BodyAuthenticated
                  templates={this.props.templates}
                  onFromScratchClick={this.createVisualizationFromScratch}
                />
              )
              : <BodyNotAuthenticated />
          }
        </ActionBox>
      </TitledPage>
    );
  }
}
