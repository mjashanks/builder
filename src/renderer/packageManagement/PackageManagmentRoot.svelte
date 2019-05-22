<script>

import Button from "../common/Button.svelte";
import {packageInfo} from "../builderStore"


</script>

<div>
    Package Location: {$packageInfo.currentPackageLocation}
</div>

<div>
    <Button className
            color="secondary" 
            groupPosition="left">Choose Package Location</Button>
    <Button color="secondary" 
            groupPosition="middle">Save Package</Button>
    <Button color="secondary" 
            groupPosition="middle">Create New</Button>
    <Button color="secondary" 
            groupPosition="right">Open</Button>
</div>

<style>


</style>