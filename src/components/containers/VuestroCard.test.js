/* global expect */
import { mount } from '@vue/test-utils';
import VuestroColumn from './VuestroColumn.vue';

describe('VuestroColumn', () => {
  const wrapper = mount(VuestroColumn, {
    slots: {
      default: 'defaultslotcontent',
    },
  });

  it('has proper name', () => {
    expect(wrapper.name()).toBe('VuestroColumn');
  });

  it('only renders heading slot if provided', () => {
    expect(wrapper.find('.heading').exists()).toBe(false);

    wrapper.vm.$scopedSlots.heading = "testheadingslot";
    // use force update since there is no wrapper.setSlots method
    wrapper.vm.$forceUpdate();
    expect(wrapper.find('.heading').exists()).toBe(true);
  });

  it('renders default slot content', () => {
    expect(wrapper.html()).toContain('defaultslotcontent');
  });

  it('assigns specified gutter size as a class', () => {
    // check default
    expect(wrapper.classes('md')).toBe(true);
    wrapper.setProps({ gutter: 'lg' });
    expect(wrapper.classes('lg')).toBe(true);
    wrapper.setProps({ gutter: 'sm' });
    expect(wrapper.classes('sm')).toBe(true);
  });

  it('assigns specified columns as a class', () => {
    // check default
    expect(wrapper.classes('width-12')).toBe(true);
    wrapper.setProps({ cols: 6 });
    expect(wrapper.classes('width-6')).toBe(true);
  });

});
