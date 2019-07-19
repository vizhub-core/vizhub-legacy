import React, { createContext, useContext, useState, useRef } from 'react';
import { VizPageDataContext } from '../VizPageDataContext';
import { defaultVizHeight, vizWidth } from '../../../constants';
import { IFrame } from './styles';

const srcDoc = `<!DOCTYPE html><script>(function(){
    window.onerror = function(msg, url, lineNumber) {
      window.parent.postMessage({type: "runtime-error", lineNumber:(lineNumber-162), message:msg}, "https://vizhub.com")
      //console.debug('blockbuilder editor error on line: ' + (lineNumber-162))
    }
  })()</script><script>if(window.jQuery){try{window.jQuery.support.cors=true}catch(e){}}; (function() {
    var XHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
      // create our "real" xhr instance
      this.xhr = new XHR();
      return this;
    }
    window.XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      // This is a hack that seems to fix a problem with the way Mapbox is requesting its TileJSON
      // Not sure what blob:// protocol is anyway...
      url = url.replace('blob://', 'http://')
      if(__fileNames.indexOf(url) >= 0) {
        // the request is for one of our files!
        // we store the fact that this request has a file here
        this.file = url;
        // we store the contents of the file in the response
        this.responseText = __files[url];

        if(url.indexOf(".xml") === url.length - 4) {
          try {
            var oParser = new DOMParser();
            var oDOM = oParser.parseFromString(this.responseText, "text/xml");
            this.responseXML = oDOM;
          } catch(e) {}
        }
        // we indicate that the request is done
        this.readyState = 4;
        this.status = 200;
      } else {
        // pass thru to the normal xhr
        this.xhr.open(method, url, async, user, password);
      }
    };
    window.XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
      if(this.file) return;
      return this.xhr.setRequestHeader(header, value);
    }
    window.XMLHttpRequest.prototype.abort = function() {
      return this.xhr.abort()
    }
    window.XMLHttpRequest.prototype.getAllResponseHeaders = function() {
      return this.xhr.getAllResponseHeaders();
    }
    window.XMLHttpRequest.prototype.getResponseHeader = function(header) {
      return this.xhr.getResponseHeader(header);
    }
    window.XMLHttpRequest.prototype.overrideMimeType = function(mime) {
      return this.xhr.overrideMimeType(mime);
    }
    window.XMLHttpRequest.prototype.send = function(data) {
      //we need to remap the fake XHR to the real one inside the onload/onreadystatechange functions
      var that = this;
      // unfortunately we need to do our copying of handlers in the next tick as
      // it seems with normal XHR you can add them after firing off send... which seems
      // unwise to do in the first place, but this is needed to support jQuery...
      setTimeout(function() {
        // we wire up all the listeners to the real XHR
        that.xhr.onerror = this.onerror;
        that.xhr.onprogress = this.onprogress;
        if(that.responseType || that.responseType === '')
            that.xhr.responseType = that.responseType
        // if the onload callback is used we need to copy over
        // the real response data to the fake object
        if(that.onload) {
          var onload = that.onload;
          that.xhr.onload = that.onload = function() {
            try{
              that.response = this.response;
              that.readyState = this.readyState;
              that.status = this.status;
              that.statusText = this.statusText;
            } catch(e) { console.log("onload", e) }
            try {
              if(that.responseType == '') {
                  that.responseXML = this.responseXML;
                  that.responseText = this.responseText;
              }
              if(that.responseType == 'text') {
                  that.responseText = this.responseText;
              }
            } catch(e) { console.log("onload responseText/XML", e) }
            onload();
          }
        }
        // if the readystate change callback is used we need
        // to copy over the real response data to our fake xhr instance
        if(that.onreadystatechange) {
          var ready = that.onreadystatechange;
          that.xhr.onreadystatechange = function() {
            try{
              that.readyState = this.readyState;
              that.responseText = this.responseText;
              that.responseXML = this.responseXML;
              that.responseType = this.responseType;
              that.status = this.status;
              that.statusText = this.statusText;
            } catch(e){
               console.log("e", e)
            }
            ready();
          }
        }
        // if this request is for a local file, we short-circuit and just
        // end the request, since all the data should be on our fake request object
        if(that.file) {
          if(that.onreadystatechange)
            return that.onreadystatechange();
          if(that.onload)
            return that.onload(); //untested
        }
        // if this is a real request, we pass through the send call
        that.xhr.send(data)
      }, 0)
    }

    var originalFetch = window.fetch;
    window.fetch = function(input, init) {
    
      var url = input;
      if (input instanceof Request) {
        url = input.url
      }
    
      // This is a hack that seems to fix a problem with the way Mapbox is requesting its TileJSON
      // Not sure what blob:// protocol is anyway...
      url = url.replace('blob://', 'http://')
        
      if(__fileNames.indexOf(url) >= 0) {
    
        var responseText = __files[url];
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: 'ok',
          url: url,
          text: function(){ return Promise.resolve(responseText) },
          json: function(){ return Promise.resolve(responseText).then(JSON.parse) },
          blob: function(){ return Promise.resolve(new Blob([responseText])) },
          // Inspired by https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
          arrayBuffer: function() {
            var buffer = new ArrayBuffer(responseText.length * 2);
            var bufferView = new Uint16Array(buffer);
            for (var i = 0, length = responseText.length; i < length; i++) {
              bufferView[i] = responseText.charCodeAt(i);
            }
            return Promise.resolve(buffer);
          }
        })
      }
    
      return originalFetch(input, init)
    }
    
  })()</script>
  <script>window.alert = function(msg) { console.log(msg) };</script>
  <meta charset="utf-8"><script>var __filesURI = "%7B%22README.md%22%3A%22Colorful%20exploration%20of%20buildings%20data%20from%20OpenStreetMap.%5Cn%5CnOpenStreetMap%20export%20of%20MIT%20campus%20area.%5Cn%5CnExported%20from%20OpenStreetMap%2C%20then%20simplified%20and%20converted%20to%20TOPOJSON%20format%20using%20%5BMapshaper%5D(http%3A%2F%2Fmapshaper.org%2F).%22%7D";
var __files = JSON.parse(decodeURIComponent(__filesURI));
var __fileNames = ["README.md"];</script><!DOCTYPE html>
<meta charset="utf-8">
<title>MIT Technicolor Campus Map</title>
<script src="https://unpkg.com/d3@4.13.0/build/d3.min.js"></script>
<script src="https://unpkg.com/topojson@3.0.2/dist/topojson.min.js"></script>
<body style="position: fixed; left: 0px; right: 0px; top: 0px; bottom: 0px; margin: 0px;">
<script>
const svg = d3.select(document.body).append('svg');
const zoomEventGrabber = svg.append('rect')
  .style('fill', 'none');
const mapG = svg.append('g');

const zoom = d3.zoom()
  .on('zoom', () => {
    mapG.attr('transform', d3.event.transform);
  });
  
svg
  .call(zoom)
  .call(zoom.transform, d3.zoomIdentity.translate(-1258.13, -491).scale(2.2));

const projection = d3.geoMercator();
const geoPath = d3.geoPath().projection(projection);
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const render = ({buildings, width, height}) => {
  svg
    .attr('width', width)
    .attr('height', height);
  
  zoomEventGrabber
    .attr('width', width)
    .attr('height', height);
  
  projection.fitSize([width, height], buildings);
  
  const buildingPaths = mapG.selectAll('path').data(buildings.features);
  buildingPaths
    .enter().append('path')
      .attr('fill-opacity', 0.2)
      .attr('stroke', 'black')
      .attr('stroke-width', 0.3)
    .merge(buildingPaths)
      .attr('d', geoPath)
      .attr('fill', d => colorScale(JSON.stringify(d.properties.tags)));
}
d3.json('https://vizhub.com/curran/datasets/mit-campus-map-data.csv', mapData => {
  const buildings = topojson.feature(mapData, mapData.objects.buildings);
  buildings.features = buildings.features.filter(d => d.properties.type !== 'relation');
  const update = () => render({
    buildings,
    width: document.body.clientWidth,
    height: document.body.clientHeight
  });
  update();
  window.addEventListener('resize', update);
});
</script>`;

export const VizRunnerContext = createContext();

export const VizRunnerProvider = ({ children }) => {
  const iFrameRef = useRef();
  const { visualization } = useContext(VizPageDataContext);
  const vizHeight = visualization.info.height || defaultVizHeight;

  const [vizRunnerTransform, setVizRunnerTransform] = useState({
    x: 0,
    y: 0,
    scale: 1
  });

  const contextValue = { setVizRunnerTransform };

  const { x, y, scale } = vizRunnerTransform;

  return (
    <>
      <VizRunnerContext.Provider value={contextValue}>
        {children}
      </VizRunnerContext.Provider>
      <IFrame
        srcDoc={srcDoc}
        ref={iFrameRef}
        width={vizWidth}
        height={vizHeight}
        style={{
          transform: `scale(${scale})`,
          top: `${y}px`,
          left: `${x}px`
        }}
      />
    </>
  );
};
