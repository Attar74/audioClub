import {shallowMount, RouterLinkStub } from '@vue/test-utils';
import AudioItem from '@/components/AudioItem.vue';
import { describe, expect, test } from 'vitest';


describe('Router', ()=> {
    const audio = {
        docId: '123',
    };

    const wrapper = shallowMount(AudioItem, {
        props: { audio },
        global: {
            components: {
                'router-link': RouterLinkStub
            }
        }
    });

    test('render router link', () => {
        const comp = wrapper.findComponent(RouterLinkStub);
        expect(comp.props().to).toEqual({ 
            name: 'audio', 
            params: { id: audio.docId } 
        })
    })
})