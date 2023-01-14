import {shallowMount, RouterLinkStub } from '@vue/test-utils';
import AudioItem from '@/components/AudioItem.vue';
import { describe, expect, test } from 'vitest';


describe("Snapshot audioItem", () => {
    const audio = {
        docID: '123',
        modified_name: 'test',
        displayed_name: 'test',
        comment_count: 5
    };

    const wrapper = shallowMount(AudioItem, {
        props: { audio },
        global: {
            components: { 'router-link': RouterLinkStub }
        }
    })
    test('renders correctly', () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})