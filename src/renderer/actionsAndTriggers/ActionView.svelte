<script>

import Textbox from "../common/Textbox.svelte";
import Button from "../common/Button.svelte";
import ButtonGroup from "../common/ButtonGroup.svelte";
import {cloneDeep} from "lodash/fp";

export let action;
export let onFinished = () => {};
export let allActions;
export let isNew = true;

let clonedAction = cloneDeep(action); 

const save = () => {

}

const cancel = () => {

}

</script>

<div class="root">

    <Textbox label="Name" bind:text={clonedAction.name} />
    <Textbox label="Behaviour Source" bind:text={clonedAction.behaviourSource} />
    <Textbox label="Behaviour" bind:text={clonedAction.behaviourName} />
    <Textbox label="Default Options" bind:text={clonedAction.behaviourName} />

    <ButtonGroup>
        <Button color="primary" grouped=true>Save</Button>
        <Button color="secondary" grouped=true>Middle</Button>
        <Button color="secondary" grouped=true>Cancel</Button>
    </ButtonGroup>
</div>


<style>

.root {
    padding: 10px;
}

</style>