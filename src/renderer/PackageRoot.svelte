<script>

import Nav from "./nav/Nav.svelte";
import Database from "./database/DatabaseRoot.svelte" ;
import UserInterface from "./userInterface/UserInterfaceRoot.svelte" ;
import ActionsAndTriggers from "./actionsAndTriggers/ActionsAndTriggersRoot.svelte" ;
import ComingSoon from "./common/ComingSoon.svelte";
import PackageManagment from "./packageManagement/PackageManagmentRoot.svelte";

import {activeNav} from "./builderStore";

export let navWidth = "50px";


</script>

<div class="root">
  <Nav width={navWidth} />
  <div class="content" 
       style="width: calc(100% - {navWidth}); left: {navWidth}"> 
    {#if $activeNav === "database"}
    <Database />
    {:else if $activeNav === "actions"}
    <ActionsAndTriggers />
    {:else if $activeNav === "triggers"}
    <ComingSoon name="Triggers"/>
    {:else if $activeNav === "access levels"}
    <ComingSoon name="Access Levels" />
    {:else if $activeNav === "user interface"}
    <UserInterface />
    {:else if $activeNav === "package"}
    <PackageManagment />
    {/if}
  </div>
</div>



<style>
	.root {
    height: 100%;
	}
  

  .content {
    position: fixed;
    height: 100%;
    background-color: var(--white);
    margin:0;
  }


</style>