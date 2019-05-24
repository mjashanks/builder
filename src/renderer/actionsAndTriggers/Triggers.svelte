<script>

import {database} from "../builderStore";
import getIcon from "../common/icon";
import Button from "../common/Button.svelte";

export let editingTrigger = null;
export let editingTriggerIsNew = true;

let getDefaultOptionsHtml = defaultOptions => 
    chain(defaultOptions, [
        keys,
        map(k => `<span style="color:var(--slate)">${k}: </span>${JSON.parse(typeOptions[k])}`),
        join("<br>")
    ]);

let editTrigger = () => {}
let deleteTrigger = () => {}


</script>

<h3>Triggers</h3>

{#if $database.triggers}
<table class="fields-table uk-table">
    <thead>
        <tr>
            <th>Event</th>
            <th>Action</th>
            <th>Create Options</th>
            <th>Condition</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each $database.triggers as trigger}
        <tr>
            <td >{trigger.eventName}</td>
            <td >{trigger.actionName}</td>
            <td >{trigger.optionsCreator}</td>
            <td >{trigger.condition}</td>
            <td>
                <span class="edit-button" on:click={() => editTrigger(trigger)}>{@html getIcon("edit")}</span>
                <span class="edit-button" on:click={() => deleteTrigger(trigger)}>{@html getIcon("trash")}</span>
            </td>
        </tr>
        {/each}
    </tbody>
</table>
{:else}
(no triggers added)
{/if}


<style>


</style>