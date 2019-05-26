<script>

import Textbox from "../common/Textbox.svelte";
import Button from "../common/Button.svelte";
import ButtonGroup from "../common/ButtonGroup.svelte";
import {cloneDeep, filter, map} from "lodash/fp";
import ErrorsBox from "../common/ErrorsBox.svelte";
import {validateActions, chain} from "../common/core";

export let action;
export let onFinished = (action) => {};
export let allActions;
export let isNew = true;

let clonedAction = cloneDeep(action); 
let defaultOptions = {};
let errors = [];

const save = () => {

    const newActionsList = [
        ...chain(allActions ,[filter(a => a !== action)]),
        clonedAction]

    errors = chain(newActionsList ,[
        validateActions,
        map(e => e.error)
    ]);

    if(errors.length === 0)
        onFinished(clonedAction);
}

const cancel = () => {
    onFinished();
}

</script>

<div class="root">

    <Textbox label="Name" bind:text={clonedAction.name} />
    <Textbox label="Behaviour Source" bind:text={clonedAction.behaviourSource} />
    <Textbox label="Behaviour" bind:text={clonedAction.behaviourName} />
    <Textbox label="Default Options" bind:text={clonedAction.behaviourName} />

    <ButtonGroup>
        <Button color="primary" grouped on:click={save}>Save</Button>
        <Button color="secondary" grouped on:click={cancel}>Cancel</Button>
    </ButtonGroup>

    <ErrorsBox errors />
</div>


<style>

.root {
    padding: 10px;
}

</style>