import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import flushPromises from 'flush-promises';
import router from './index';
import { app } from '../main';
import footer from '../components/AppFooter.vue';

describe('Router', () => {
  beforeEach(async () => {
    router.push('/');
    await router.isReady(); // Wait for the router to be ready
  });

  it('navigates to home route', async () => {
    router.push('/');
    await router.isReady(); // Wait for the router to be ready

    const wrapper = mount(app, {
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.vm.$route.name).toBe('Home');
  });

  it('navigates to changelog route', async () => {
    await router.push('/changelog');
    const wrapper = mount(app, {
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.vm.$route.name).toBe('Changelog');
    await router.push('/');
    expect(wrapper.vm.$route.name).toBe('Home');
  });

  it('should navigate to changelog page when link is clicked', async () => {
    const wrapper = mount(footer, {
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.vm.$route.name).toBe('Home');
    expect(wrapper.find('a#changelog-link').exists()).toBe(true);
    await wrapper.find('a#changelog-link').trigger('click'); // Simulate clicking the link
    // Wait for all promises to resolve
    await flushPromises();
    // Wait for the router to be ready after navigation
    await router.isReady();
    expect(wrapper.vm.$route.name).toBe('Changelog');
  });
});