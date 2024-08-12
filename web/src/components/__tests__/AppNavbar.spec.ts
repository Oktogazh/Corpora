import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import AppNavbar from '@/components/AppNavbar.vue'

describe('Dark Mode Switch', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('toggles dark mode when button is clicked', async () => {
    const wrapper = mount(AppNavbar)

    // Initially, dark mode should be off
    expect(wrapper.vm.isDarkMode).toBe(false);
    expect(document.body.classList.contains('light')).toBe(true);

    // Click the button to toggle dark mode
    await wrapper.find('#dark-mode-switch').trigger('click');

    // Dark mode should be on
    expect(wrapper.vm.isDarkMode).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);

    // Click the button again to toggle dark mode off
    await wrapper.find('#dark-mode-switch').trigger('click');

    // Dark mode should be off
    expect(wrapper.vm.isDarkMode).toBe(false);
    expect(document.body.classList.contains('light')).toBe(true);
  });

  it('keeps dark mode preference on page reload', async () => {
    // Mount the component
    const wrapper = mount(AppNavbar);

    // Simulate clicking the button to enable dark mode
    await wrapper.find('#dark-mode-switch').trigger('click');

    // Check if dark mode is enabled
    expect(wrapper.vm.isDarkMode).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);

    // Simulate page reload by remounting the component
    const reloadedWrapper = mount(AppNavbar);

    // Check if dark mode preference is kept
    expect(reloadedWrapper.vm.isDarkMode).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('keeps light mode preference on page reload', async () => {
    // Mount the component
    const wrapper = mount(AppNavbar);

    // Initially, dark mode should be off
    expect(wrapper.vm.isDarkMode).toBe(false);
    expect(document.body.classList.contains('light')).toBe(true);


    // Click the button again to toggle dark mode off
    await wrapper.find('#dark-mode-switch').trigger('click');

    // Click the button again to toggle dark mode off
    await wrapper.find('#dark-mode-switch').trigger('click');

    // Simulate page reload by remounting the component
    const reloadedWrapper = mount(AppNavbar);

    // Check if light mode preference is kept
    expect(reloadedWrapper.vm.isDarkMode).toBe(false);
    expect(document.body.classList.contains('light')).toBe(true);
  });
})
