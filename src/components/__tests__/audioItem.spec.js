import AudioItem from "@/components/AudioItem.vue";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { describe, test, expect } from "vitest";


describe('AudioItem.vue', () => {
    const audio = {
        display_name: "test",
        docID: "123",
    };
    const wrapper = shallowMount(AudioItem, {
        props: {
            audio,
        },
        global: {
            components: {
                'router-link': RouterLinkStub
            }
        }
    });
    test('render audio.display_name', () => {        
        const compositionAuthor = wrapper.find('.text-gray-500')
        
        expect(compositionAuthor.text()).toBe(audio.display_name);
    })
    test('render audio.socID in id attibute', () => {                    
        
        // expect(wrapper.attributes().id).toBe(`audio-id-${audio.docID}`);
        expect(wrapper.classes()).toContain(`audio-id-${audio.docID}`);
    })
})