import { describe, expect, test, vi } from 'vitest';
import About from '@/views/About.vue'
// shallowMount limit childeren component - 1 level 
// mount limit childeren component - all levels as u want 
// mount (, { shallow: true}) same as shallowMOunt
import { shallowMount } from '@vue/test-utils'

const wrapper = shallowMount(About);

describe("About View", () => {
    test("render inner text", ()=> {        
        expect(wrapper.text()).toContain("About")
    })
})