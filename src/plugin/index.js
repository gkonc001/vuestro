/* global _ */
import VuestroApp from '../components/VuestroApp';
import VuestroAreaChart from '../components/charts/VuestroAreaChart';
import VuestroAsyncText from '../components/text/VuestroAsyncText';
import VuestroBarChart from '../components/charts/VuestroBarChart';
import VuestroBreadcrumb from '../components/containers/VuestroBreadcrumb';
import VuestroButton from '../components/VuestroButton';
import VuestroCalendar from '../components/containers/calendar/VuestroCalendar';
import VuestroCaret from '../components/misc/VuestroCaret';
import VuestroCard from '../components/containers/VuestroCard';
import VuestroChartPanel from '../components/charts/VuestroChartPanel';
import VuestroCheckOrX from '../components/misc/VuestroCheckOrX';
import VuestroCode from '../components/text/VuestroCode';
import VuestroContainer from '../components/containers/VuestroContainer';
import VuestroCleanKvp from '../components/text/VuestroCleanKvp';
import VuestroColorPicker from '../components/pickers/VuestroColorPicker';
import VuestroConfirm from '../components/VuestroConfirm';
import VuestroDatePicker from '../components/pickers/VuestroDatePicker';
import VuestroDropdown from '../components/VuestroDropdown';
import VuestroDonutChart from '../components/charts/VuestroDonutChart';
import VuestroDynamicTable from '../components/VuestroDynamicTable';
import VuestroEditableText from '../components/text/VuestroEditableText';
import VuestroEditor from '../components/input/VuestroEditor';
import VuestroEllipsisText from '../components/text/VuestroEllipsisText';
import VuestroUpload from '../components/input/VuestroUpload';
import VuestroForceGraph from '../components/charts/VuestroForceGraph';
import VuestroGeoPattern from '../components/misc/VuestroGeoPattern';
import VuestroGrid from '../components/grid/VuestroGrid';
import VuestroGridBox from '../components/grid/VuestroGridBox';
import VuestroHr from '../components/misc/VuestroHr';
import VuestroIcon from '../components/misc/VuestroIcon';
import VuestroLabel from '../components/text/VuestroLabel';
import VuestroListButton from '../components/list/VuestroListButton';
import VuestroListGroup from '../components/list/VuestroListGroup';
import VuestroListGroupToggle from '../components/list/VuestroListGroupToggle';
import VuestroListItem from '../components/list/VuestroListItem';
import VuestroMap from '../components/charts/VuestroMap';
import VuestroModal from '../components/modal/VuestroModal';
import VuestroMultiSelect from '../components/input/VuestroMultiSelect';
import VuestroNotifications from '../components/VuestroNotifications';
import VuestroObjectBrowser from '../components/VuestroObjectBrowser';
import VuestroObjectBrowserModal from '../components/modal/VuestroObjectBrowserModal';
import VuestroOmbre from '../components/containers/VuestroOmbre';
import VuestroPanel from '../components/containers/VuestroPanel';
import VuestroParameterList from '../components/input/VuestroParameterList';
import VuestroPill from '../components/VuestroPill';
import VuestroSankeyChart from '../components/charts/VuestroSankeyChart';
import VuestroSearchHighlight from '../components/text/VuestroSearchHighlight';
import VuestroShimmer from '../components/misc/VuestroShimmer';
import VuestroSidebar from '../components/sidebar/VuestroSidebar';
import VuestroSpinner from '../components/input/VuestroSpinner';
import VuestroStatPanel from '../components/charts/VuestroStatPanel';
import VuestroSvgTooltip from '../components/charts/VuestroSvgTooltip';
import VuestroBarSvgTooltip from '../components/charts/VuestroBarSvgTooltip';
import VuestroSvgButton from '../components/charts/VuestroSvgButton';
import VuestroSvgLegend from '../components/charts/VuestroSvgLegend';
import VuestroTable from '../components/VuestroTable';
import VuestroTextField from '../components/input/VuestroTextField';
import VuestroTimePicker from '../components/pickers/VuestroTimePicker';
import VuestroTitle from '../components/text/VuestroTitle';
import VuestroTooltip from '../components/VuestroTooltip';
import VuestroTray from '../components/containers/VuestroTray';

import VuestroMixins from './mixins';

export default {
  install(Vue, options) {
    //
    // COMPONENT REGISTRATION
    //
    Vue.component(VuestroApp.name, VuestroApp);
    Vue.component(VuestroAreaChart.name, VuestroAreaChart);
    Vue.component(VuestroAsyncText.name, VuestroAsyncText);
    Vue.component(VuestroBarChart.name, VuestroBarChart);
    Vue.component(VuestroBreadcrumb.name, VuestroBreadcrumb);
    Vue.component(VuestroButton.name, VuestroButton);
    Vue.component(VuestroCalendar.name, VuestroCalendar);
    Vue.component(VuestroCaret.name, VuestroCaret);
    Vue.component(VuestroCard.name, VuestroCard);
    Vue.component(VuestroChartPanel.name, VuestroChartPanel);
    Vue.component(VuestroCheckOrX.name, VuestroCheckOrX);
    Vue.component(VuestroConfirm.name, VuestroConfirm);
    Vue.component(VuestroContainer.name, VuestroContainer);
    Vue.component(VuestroCleanKvp.name, VuestroCleanKvp);
    Vue.component(VuestroCode.name, VuestroCode);
    Vue.component(VuestroColorPicker.name, VuestroColorPicker);
    Vue.component(VuestroDatePicker.name, VuestroDatePicker);
    Vue.component(VuestroDropdown.name, VuestroDropdown);
    Vue.component(VuestroDonutChart.name, VuestroDonutChart);
    Vue.component(VuestroDynamicTable.name, VuestroDynamicTable);
    Vue.component(VuestroEditableText.name, VuestroEditableText);
    Vue.component(VuestroEditor.name, VuestroEditor);
    Vue.component(VuestroEllipsisText.name, VuestroEllipsisText);
    Vue.component(VuestroForceGraph.name, VuestroForceGraph);
    Vue.component(VuestroGeoPattern.name, VuestroGeoPattern);
    Vue.component(VuestroGrid.name, VuestroGrid);
    Vue.component(VuestroGridBox.name, VuestroGridBox);
    Vue.component(VuestroHr.name, VuestroHr);
    Vue.component(VuestroIcon.name, VuestroIcon);
    Vue.component(VuestroLabel.name, VuestroLabel);
    Vue.component(VuestroListButton.name, VuestroListButton);
    Vue.component(VuestroListGroup.name, VuestroListGroup);
    Vue.component(VuestroListGroupToggle.name, VuestroListGroupToggle);
    Vue.component(VuestroListItem.name, VuestroListItem);
    Vue.component(VuestroMap.name, VuestroMap);
    Vue.component(VuestroModal.name, VuestroModal);
    Vue.component(VuestroMultiSelect.name, VuestroMultiSelect);
    Vue.component(VuestroNotifications.name, VuestroNotifications);
    Vue.component(VuestroObjectBrowser.name, VuestroObjectBrowser);
    Vue.component(VuestroObjectBrowserModal.name, VuestroObjectBrowserModal);
    Vue.component(VuestroOmbre.name, VuestroOmbre);
    Vue.component(VuestroPanel.name, VuestroPanel);
    Vue.component(VuestroParameterList.name, VuestroParameterList);
    Vue.component(VuestroPill.name, VuestroPill);
    Vue.component(VuestroSankeyChart.name, VuestroSankeyChart);
    Vue.component(VuestroShimmer.name, VuestroShimmer);
    Vue.component(VuestroSidebar.name, VuestroSidebar);
    Vue.component(VuestroSpinner.name, VuestroSpinner);
    Vue.component(VuestroStatPanel.name, VuestroStatPanel);
    Vue.component(VuestroSvgTooltip.name, VuestroSvgTooltip);
    Vue.component(VuestroBarSvgTooltip.name, VuestroBarSvgTooltip);
    Vue.component(VuestroSearchHighlight.name, VuestroSearchHighlight);
    Vue.component(VuestroSvgButton.name, VuestroSvgButton);
    Vue.component(VuestroSvgLegend.name, VuestroSvgLegend);
    Vue.component(VuestroTable.name, VuestroTable);
    Vue.component(VuestroTextField.name, VuestroTextField);
    Vue.component(VuestroTimePicker.name, VuestroTimePicker);
    Vue.component(VuestroTitle.name, VuestroTitle);
    Vue.component(VuestroTooltip.name, VuestroTooltip);
    Vue.component(VuestroTray.name, VuestroTray);
    Vue.component(VuestroUpload.name, VuestroUpload);
    //
    // FILTERS
    //
    // filter to add commas to a number
    Vue.filter('vuestroCommas', (d) => {
      if (d === null || d === undefined) {
        return '';
      }
      if (typeof(d) === 'number') {
        return Number(d).toLocaleString('en');
      }
      if (typeof(d) === 'string') {
        let n = Number(parseFloat(d)).toLocaleString('en');
        if (!isNaN(n)) {
          return n;
        }
      }
      return d;
    });
    // filter to render a group of 10 digits as a US phone number
    Vue.filter('vuestroPhoneUS', (d) => {
      if (d === null || d === undefined) {
        return '';
      }
      if (typeof(d) === 'number') {
        d = `${d}`;
      }
      return d.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    });
    // render the given string or UNIX time or date object as HH:MM:SS
    Vue.filter('vuestroHMS', (d) => {
      let hours, minutes, seconds;
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
        hours = d.getHours();
        minutes = d.getMinutes();
        seconds = d.getSeconds();
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
        hours = d.getUTCHours();
        minutes = d.getUTCMinutes();
        seconds = d.getUTCSeconds();
      }
      return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
    });
    // render the given string or UNIX time or date object as ISO8601
    Vue.filter('vuestroIsoDate', (d) => {
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
      }
      return d.toISOString();
    });
    // render the given string or UNIX time or date object as a local datetime
    Vue.filter('vuestroDate', (d) => {
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
      }
      return d.toLocaleString();
    });
    // render the given string or UNIX time or date object as a local date only
    Vue.filter('vuestroLocaleDate', (d) => {
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
      }
      return d.toLocaleDateString();
    });
    // render the given string or UNIX time or date object as a local time only
    Vue.filter('vuestroLocaleTime', (d) => {
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
      }
      return d.toLocaleTimeString();
    });
    // filter to humanize a byte count with the ppropriate suffix, uses 1k=1000
    Vue.filter('vuestroBytes', (intNum) => {
      if (intNum === null || intNum === undefined) {
        return '';
      }
      const suffixes = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
      if (intNum < 1000) {
        return intNum.toFixed(1) + suffixes[0];
      }
      let i = parseInt(Math.floor(Math.log(intNum) / Math.log(1000)), 10);
      return (intNum / Math.pow(1000, i)).toFixed(1) + suffixes[i];
    });
    // filter to humanize a number with an appropriate suffix
    Vue.filter('vuestroHumanNum', (intNum) => {
      if (intNum == null || intNum === undefined) {
        return '';
      }
      const suffixes = ['k', 'M', 'B', 'T', 'Qd', 'Qn', 'Sx', 'Sp', 'O', 'N', 'D', 'G', 'Gp'];
      if (intNum < 1000) {
        return intNum % 1 > 0 ? intNum.toFixed(1):intNum;
      }
      let i = parseInt(Math.floor(Math.log(intNum) / Math.log(1000)), 10) - 1;
      return (intNum / Math.pow(1000, i+1)).toFixed(1) + suffixes[i];
    });
    // filter for title case, attempt to be smart about titling rules
    Vue.filter('vuestroTitleCase', (str) => {
      return str.split(' ').map(function(word, idx) {
        let exceptions = [
          // short conjunctions
          'and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet',
          // articles
          'a', 'an', 'the',
          // short prepositions
          'as', 'at', 'by', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via',
          // Apple words
          'iOS', 'macOS', 'iCloud',
        ];
        if (idx === 0 || exceptions.indexOf(word) < 0) {
          let hyphenated = word.split('-');
          if (hyphenated.length > 1) {
            return hyphenated.map(function(word) {
              return word.replace(word[0], word[0].toUpperCase());
            }).join('-');
          }
          return word.replace(word[0], word[0].toUpperCase());
        }
        return word;
      }).join(' ');
    });
    // use by adding v-vuestro-blur="onBlur" to your element,
    // onBlur method will be called when a click event bubbles up to document.body
    // which didn't originate from within your element
    Vue.directive('vuestro-blur', {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    });
    //
    // MIXINS
    //
    Vue.mixin(VuestroMixins);
  }
};
