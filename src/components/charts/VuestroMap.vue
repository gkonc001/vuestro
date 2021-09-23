<template>
  <div class="vuestro-map">
    <div ref="theMap" class="vuestro-map-inner"></div>
    <div v-if="layers.length == 0" class="vuestro-map-token-missing">No layers defined</div>
    <div class="vuestro-map-view-info">
      <vuestro-pill color="var(--vuestro-info)">
        <template #title>Center</template>
        <template #value>{{ view.center[0] }}, {{ view.center[1] }}</template>
      </vuestro-pill>
      <vuestro-pill color="var(--vuestro-indigo)">
        <template #title>Zoom</template>
        <template #value>{{ view.zoom }}</template>
      </vuestro-pill>
      <vuestro-pill color="var(--vuestro-primary)">
        <template #title>Markers</template>
        <template #value>{{ data.length }}</template>
      </vuestro-pill>
    </div>
    <div ref="popupContent">
      <div class="vuestro-map-popup-title">{{ currentItem.title || currentItem.shape }}</div>
      <div v-if="currentItem.shape === 'Rectangle'" class="vuestro-map-popup-kvp">
        <span>Max Lat</span><span>{{ currentItem.maxLat }}</span>
      </div>
      <div v-if="currentItem.shape === 'Rectangle'" class="vuestro-map-popup-kvp">
        <span>Min Lat</span><span>{{ currentItem.minLat }}</span>
      </div>
      <div v-if="currentItem.shape === 'Rectangle'" class="vuestro-map-popup-kvp">
        <span>Min Lon</span><span>{{ currentItem.minLng }}</span>
      </div>
      <div v-if="currentItem.shape === 'Rectangle'" class="vuestro-map-popup-kvp">
        <span>Max Lon</span><span>{{ currentItem.maxLng }}</span>
      </div>
      <div v-if="currentItem.shape === 'Circle'" class="vuestro-map-popup-kvp">
        <span>Lat</span><span>{{ currentItem.lat }}</span>
      </div>
      <div v-if="currentItem.shape === 'Circle'" class="vuestro-map-popup-kvp">
        <span>Lon</span><span>{{ currentItem.lng }}</span>
      </div>
      <div v-if="currentItem.shape === 'Circle'" class="vuestro-map-popup-kvp">
        <span>Radius (m)</span><span>{{ currentItem.radius | vuestroCommas }}</span>
      </div>
      <template v-if="currentItem.shape === 'Polygon'" v-for="(p, idx) in currentItem.points">
        {{ p.lat }}, {{ p.lng }}
      </template>
      <div v-if="currentItem.shape === 'Marker'" class="vuestro-map-popup-kvp">
        <span>Lat</span><span>{{ currentItem.lat }}</span>
      </div>
      <div v-if="currentItem.shape === 'Marker'" class="vuestro-map-popup-kvp">
        <span>Lon</span><span>{{ currentItem.lng }}</span>
      </div>
      <template v-if="currentItem.kvps" v-for="(v, k) in currentItem.kvps">
        <div class="vuestro-map-popup-kvp">
          <span>{{ k }}</span><span>{{ v }}</span>
        </div>
      </template>

      <div class="vuestro-map-popup-content">
        <slot name="popup-content" :item="currentItem"></slot>
      </div>
    </div>
  </div>
</template>

<script>

/* global _, L */
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
delete L.Icon.Default.prototype._getIconUrl;

// fix up leaflet marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/* markercluster plugin */
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';

/* geoman plugin */
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.min.js';

export default {
  name: 'VuestroMap',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
    markers: { type: Object, default: () => ({}), required: false},
  },
  data() {
    return {
      showShapeInfoModal: false,
      dataTitleKey: 'title',
      dataCoordinateKey: 'coords',
      dataTooltipkey: 'tooltip',
      dataExtraKvps: [],
      map: null,
      layers: [],
      view: {
        fit: true,
        center: [0, 0],
        zoom: 17,
      },
      currentItem: {
        title: 'test',
        description: 'desc',
      },
    };
  },
  watch: {
    data(newVal) {
      this.refresh();
    },
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    // if no layers, add a fail-safe
    if (this.layers.length === 0) {
      this.layers.push({
        title: 'OpenStreetMap',
        type: 'TileLayer',
        // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
      });
    }

    if (this.layers.length > 0) {
      this.refresh();
    }
  },
  methods: {
    refresh() {
      let baseMaps = [];
      let overlayMaps = [];
      for (let l of this.layers) {
        if (l.title && l.type) { // check required params
          switch (l.type) {
            case 'TileLayer':
              if (l.url) {
                baseMaps.push(L.tileLayer(l.url, l.options || {}));
              } else {
                console.warn('VuestroMap missing url from TileLayer');
              }
              break;
            case 'ImageOverlay':
              if (l.url && l.bounds) {
                overlayMaps.push(L.imageOverlay(l.url, l.bounds, l.options || {}));
              } else {
                console.warn('VuestroMap missing url and bounds on ImageOverlay layer');
              }
              break;
            case 'PolyLine':
              if (l.latlngs) {
                overlayMaps.push(L.polyline(l.latlngs, l.options || {}));
              } else {
                console.warn('VuestroMap missing latlngs array for PolyLine layer');
              }
              break;
            case 'Polygon':
              if (l.latlngs) {
                overlayMaps.push(L.polygon(l.latlngs, l.options || {}));
              } else {
                console.warn('VuestroMap missing latlngs for Polygon layer');
              }
              break;
            case 'Rectangle':
              if (l.bounds) {
                overlayMaps.push(L.rectangle(l.bounds, l.options || {}));
              } else {
                console.warn('VuestroMap missing bounds array for Rectangle layer');
              }
              break;
            case 'Circle':
              if (l.latlng && l.radius) {
                overlayMaps.push(L.circle(l.latlng, l.radius, l.options || {}));
              } else {
                console.warn('VuestroMap missing latlng and radius for Circle layer');
              }
              break;
            case 'Marker':
              if (l.latlng) {
                let icon = L.divIcon({
                  iconSize: [20, 40],
                  iconAnchor: [10, 35],
                  className: 'vuestro-map-marker',
                  html: `<svg viewBox="0 0 289 512" version="1.1" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g transform="matrix(1,0,0,1,-442.225,-95.7423)"><path d="M586.374,95.742C665.931,95.742 730.522,160.333 730.522,239.891C730.522,361.821 586.374,607.562 586.374,607.562C586.374,607.562 442.225,361.937 442.225,239.891C442.225,160.333 506.816,95.742 586.374,95.742ZM586.374,164.092C628.208,164.092 662.173,198.056 662.173,239.891C662.173,281.726 628.208,315.69 586.374,315.69C544.539,315.69 510.575,281.726 510.575,239.891C510.575,198.056 544.539,164.092 586.374,164.092Z" style="fill: ${l.color || 'var(--vuestro-purple)'}"/></g></svg>`
                });

                overlayMaps.push(L.marker(l.latlng, {
                  icon,
                  ...l.options
                }));
              } else {
                console.warn('VuestroMap missing latlng Marker layer');
              }
              break;
            case 'Tooltip':
              if (l.latlng && l.content) {
                overlayMaps.push(L.tooltip({
                  direction: 'top',
                  offset: [0, -35],
                  ...l.options,
                }).setLatLng(l.latlng).setContent(l.content));
              } else {
                console.warn('VuestroMap missing latlng and content from Tooltip layer');
              }
              break;
          }
        }
      }

      // process data array as clustered markers with tooltips
      if (this.data && this.data.length > 0) {
        var markers = L.markerClusterGroup();
        for (let d of this.data) {
          if (d[this.dataCoordinateKey]) {
            let kvps = {};
            // add extra kvps
            for (let k of this.options.dataExtraKvps) { // use options instance directly, since this is never changed locally
              if (d[k] !== undefined) { // only if defined
                kvps[k] = d[k];
              }
            }
            // Bind tooltip to markers only if tooltip is provided
            if(d[this.dataTooltipkey]){
              markers.addLayer(L.marker(d[this.dataCoordinateKey], (this.markers.data ? {icon: this.markers.data.icon} : undefined))
              .bindTooltip(d[this.dataTooltipkey].content, d[this.dataTooltipkey].options)
              .bindPopup(this.$refs.popupContent).on('popupopen', () => {
              this.currentItem = {
                  title: d[this.dataTitleKey],
                  shape: 'Marker',
                  lat: d[this.dataCoordinateKey][0],
                  lng: d[this.dataCoordinateKey][1],
                  kvps
                };
              }));
              // otherwise add markers as normal
            }else{
              markers.addLayer(L.marker(d[this.dataCoordinateKey], (this.markers.data ? {icon: this.markers.data.icon} : undefined)).bindPopup(this.$refs.popupContent).on('popupopen', () => {
                this.currentItem = {
                  title: d[this.dataTitleKey],
                  shape: 'Marker',
                  lat: d[this.dataCoordinateKey][0],
                  lng: d[this.dataCoordinateKey][1],
                  kvps
                };
              }));
            }
          }
          overlayMaps.push(markers);
        }
      }

      // kill existing map
      if (this.map) {
        this.map.remove();
      }

      this.map = L.map(this.$refs.theMap, {
        layers: [...baseMaps, ...overlayMaps],
      });
      if (this.view.fit && this.data.length > 0) {
        let bounds = [];
        for (let d of this.data) {
          bounds.push(d[this.dataCoordinateKey]);
        }
        this.map.fitBounds(bounds, { padding: [20, 20] });
        // set center and zoom based on fitment
        this.updateCenter();
        this.updateZoom();
      } else {
        this.map.setView(this.view.center, this.view.zoom, this.view.options || {});
      }
      L.control.scale().addTo(this.map);
      this.map.on('move', this.updateCenter);
      this.map.on('zoom', this.updateZoom);

      this.map.pm.addControls({
        position: 'topleft',
        drawPolyline: false,
        drawCircleMarker: false,
        cutPolygon: false,
      });
      if (this.markers.draw) {
        this.map.pm.setGlobalOptions({
          markerStyle: {
            icon: this.markers.draw.icon,
          }
        })
      }
      this.map.on('pm:create', (e) => {
        e.layer.bindPopup(this.$refs.popupContent).on('popupopen', () => {
          this.currentItem = this.handleShapeClick(e);
        });
      });
    },
    updateCenter() {
      // update map center data from leaflet
      let center = this.map.getCenter();
      this.$set(this.view.center, 0, center.lat);
      this.$set(this.view.center, 1, center.lng);
    },
    updateZoom() {
      // update map zoom from leaflet
      this.view.zoom = this.map.getZoom();
    },
    formatCoords(c) {
      return `${c[0]}, ${c[1]}`;
    },
    handleShapeClick(e) {
      let ret;
      switch (e.shape) {
        case 'Rectangle':
          ret = {
            shape: e.shape,
            minLat: e.layer._bounds._southWest.lat,
            maxLat: e.layer._bounds._northEast.lat,
            minLng: e.layer._bounds._southWest.lng,
            maxLng: e.layer._bounds._northEast.lng,
          };
          break;
        case 'Polygon':
          ret = {
            shape: e.shape,
            points: e.layer._latlngs[0],
          };
          break;
        case 'Circle':
          ret = {
            shape: e.shape,
            ...e.layer._latlng,
            radius: e.layer._mRadius,
          };
          break;
        case 'Marker':
          ret = {
            shape: e.shape,
            ...e.layer._latlng,
          };
          break;
      }
      return ret;
    },
  },
};

</script>

<style scoped>

.vuestro-map {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
  border-radius: var(--vuestro-control-border-radius);
}

.vuestro-map-inner {
  width: 100%;
  height: 100%;
}

.vuestro-map-token-missing {
  width: 100%;
  padding: 20px;
  background-color: var(--vuestro-danger);
  color: var(--vuestro-text-color-inverse);
}

.vuestro-dark .vuestro-map >>> .leaflet-bar {
  border: none;
}
.vuestro-dark .vuestro-map >>> .leaflet-bar > a,
.vuestro-dark .vuestro-map >>> .leaflet-buttons-control-button {
  color: var(--vuestro-gray);
  background-color: var(--vuestro-dark);
  border-color: var(--vuestro-outline);
  filter: brightness(180%);
}

.vuestro-map-popup-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--vuestro-gray-med);
  width: 240px;
  margin-bottom: 5px;
}

.vuestro-map-popup-kvp {
  display: flex;
  justify-content: space-between;
}
.vuestro-map-popup-kvp span:first-child {
  font-weight: 500;
}
.vuestro-map-popup-content {
  margin-top: 5px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

</style>