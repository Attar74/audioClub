import Home from "@/views/Home.vue";
import AudioItem from "@/components/AudioItem.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, test, expect } from "vitest";


const audios =  [{}, {}, {}];
const home_wrapper = shallowMount(Home, {
    data() {
        return {
            audios,
        }
    },
    global: {
        mocks: {
            $t: (message) => message, //registering i18n
        }
    }
});

const items = home_wrapper.findAllComponents(AudioItem);

describe("Home", ()=> {
    test('render list of audios', ()=> {

        expect(items).toHaveLength(audios.length)

        items.forEach((wrapper, i)=>{
            expect(wrapper.props().audio).toStrictEqual(audios[i])
        })
    })
})