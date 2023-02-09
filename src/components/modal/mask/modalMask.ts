import {Component, Vue} from "vue-property-decorator";
import {LoadMask, MaskModel, State} from "@/store/model";

@Component({
    components:{

    }
})
export default class ModalMask extends Vue {

    get state() : State{
        return this.$store.state
    }

    get mask() : MaskModel {
        return this.state.mask;
    }

    get loadMask() : LoadMask | null{
        return this.mask.loadMask;
    }

    get showLoadMask() : boolean | undefined{
        return this.loadMask?.show;
    }

}