<script>

import {database} from "../builderStore";
import getIcon from "../common/icon";
import Button from "../common/Button.svelte";
import ButtonGroup from "../common/ButtonGroup.svelte";
import ActionView from "./ActionView.svelte";
import Modal from "../common/Modal";
import {chain} from "../common/core";
import {keys, map, join} from "lodash/fp";

export let editingActionIsNew = false;
export let editingAction = null;
export let onEditAction = (action) => {};
export let onDeleteAction = (action) => {};

let getDefaultOptionsHtml = defaultOptions => 
    chain(defaultOptions, [
        keys,
        map(k => `<span style="color:var(--slate)">${k}: </span>${JSON.parse(typeOptions[k])}`),
        join("<br>")
    ]);


let actionEditingFinished = (action) => {
    
    editingAction = null;
    if(action) {
        database.addAction(action);
    }
}

</script>

<h3>Actions</h3>

{#if $database.actions}
<table class="fields-table uk-table">
    <thead>
        <tr>
            <th>Description</th>
            <th>Behaviour Source</th>
            <th>Behaviour Name</th>
            <th>Default Options</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each $database.actions as action}
        <tr>
            <td >{action.name}</td>
            <td >{action.behaviourSource}</td>
            <td >{action.behaviourName}</td>
            <td >{getDefaultOptionsHtml(action.initialOptions)}</td>
            <td class="edit-button">
                <span on:click={() => onEditAction(action)}>{@html getIcon("edit")}</span>
                <span on:click={() => onDeleteAction(action)}>{@html getIcon("trash")}</span>
            </td>
        </tr>
        {/each}
    </tbody>
</table>
{:else}
(no actions added)
{/if}

{#if editingAction}
<Modal isOpen={!!editingAction}>
    <ActionView action={editingAction}
                allActions={$database.actions}
                onFinished={actionEditingFinished}
                isNew={editingActionIsNew}/>
</Modal>
{/if}

<style>

.edit-button {
    cursor:pointer;
    color: var(--white);
}

tr:hover .edit-button  {
    color: var(--secondary75);
}


</style>