<script>

import Button from "../common/Button.svelte";
import ButtonGroup from "../common/ButtonGroup.svelte";
import {packageInfo, createNewPackage} from "../builderStore"
import {remote} from "electron";
import {join} from "lodash/fp";
import fs from "../common/fs-async.js";

const choosePackageLocation = () => {
    const path = remote.dialog.showOpenDialog({
        properties: ['openDirectory']
    });

    if(path)
        packageInfo.choosePackageLocation(path[0]);
}

let savePackage;
let errors = [];

packageInfo.subscribe(p => {
    savePackage = () => packageInfo.savePackage(p.currentPackageLocation);
})

const openPackage = () => {
    const path = remote.dialog.showOpenDialog({
        properties: ['openDirectory']
    });

    if(!path) return;
    
    errors = packageInfo.openPackage(path[0]);
}

</script>

<div class="root">
        
    <ButtonGroup style="margin-bottom: 20px">
        <Button color="secondary" 
                grouped
                on:click={choosePackageLocation}>Choose Package Location</Button>
        <Button color="secondary" 
                grouped
                on:click={savePackage}>Save Package</Button>
        <Button color="secondary" 
                grouped
                on:click={createNewPackage}>Create New</Button>
        <Button color="secondary" 
                grouped
                on:click={openPackage}>Open</Button>
    </ButtonGroup>

    <div>
        <div class="info">Package Location: <span class="value">{$packageInfo.currentPackageLocation}</span></div>
        <div class="info">Last Saved: <span class="value">{$packageInfo.lastSaved ? $packageInfo.lastSaved : "never"}</span></div>
    </div>

    {#if $packageInfo.packageManagerErrors.length > 0}
    <div class="errors">
        
        {#each $packageInfo.packageManagerErrors as error}
        <div>{error}</div>
        {/each}
        
    </div>
    {/if}

</div>

<style>

.root {
    padding: 10px; 
}

.info {
    margin-top: 10px;
}

.info .value {
    font-weight: bold;
}

.errors {
    background-color: rgb(244, 66, 66, 0.1);
    border-radius: var(--borderradiusall);
    padding:15px;
    margin-top: 20px;
}

</style>