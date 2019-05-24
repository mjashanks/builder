<script>

import {database} from "../builderStore";
import getIcon from "../common/icon";
import Button from "../common/Button.svelte";
import ButtonGroup from "../common/ButtonGroup.svelte";
import Actions from "./Actions.svelte";
import Triggers from "./Triggers.svelte";
import {getNewAction, getNewTrigger} from "../common/core";

let editingAction = null;
let editingActionIsNew = true;

let editingTrigger = null;
let editingTriggerIsNew = true;

let getDefaultOptionsHtml = defaultOptions => 
    chain(defaultOptions, [
        keys,
        map(k => `<span style="color:var(--slate)">${k}: </span>${JSON.parse(typeOptions[k])}`),
        join("<br>")
    ]);

let editAction = (action) => {
    editingAction = action;
    editingActionIsNew = false;
}

let newAction = () => {
    editingAction = getNewAction();
    editingActionIsNew = true;
}

let deleteAction = () => {}
let deleteTrigger = () => {}

let editTrigger = (trigger) => {
    editingTrigger = trigger;
    editingTriggerIsNew = false;
}

let newTrigger = () => {
    editingTrigger = getNewTrigger();
    editingTriggerIsNew = true;
}

</script>

<div class="root">

<ButtonGroup>
    <Button color="secondary" 
            grouped
            on:click={newAction}>Create New Action</Button>
    <Button color="secondary" 
            grouped
            on:click={newTrigger}>Create New Trigger</Button>
</ButtonGroup>

<Actions editingActionIsNew bind:editingAction />

<Triggers editingTriggerIsNew bind:editingTrigger />

</div>

<style>

.root {
    padding: 0px 10px 10px 20px;
}

.actions {
    margin-top: 15px;
    margin-bottom: 25px;
    display: flex;
}

</style>