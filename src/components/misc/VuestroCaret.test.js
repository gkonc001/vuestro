/* global expect */
import { mount } from '@vue/test-utils';
import VuestroCaret from './VuestroCaret.vue';

describe('VuestroCaret', () => {
  const wrapper = mount(VuestroCaret, {
    propsData: {
      collapsed: false,
    }
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroCaret');
  });

  it('should emit click when clicked', () => {
    wrapper.trigger('click');
    expect(wrapper.emitted('click').length).toBe(1);
  });

});
